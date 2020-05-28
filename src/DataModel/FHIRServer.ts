import { DataSource } from './DataSource';

import Patient from './Patient';
import axios from 'axios';
import config from "../config";
import { Identifier, Name, Address, Measurement, Observation } from './Resource';
import { Progress } from '../store/patients/types';
import { Practitioner, MaybePractitioner } from './Practitioner';

export default class FHIRServer implements DataSource {

  rootUrl: string;
  /**
   *Creates an instance of FHIRServer.
  * @memberof FHIRServer
  */
  constructor() {
      this.rootUrl = config.fihrRootUrl;
    }

  // This method takes in an Object and returns a string representing the next url, if it exists
  private extractNextUrl(data: {link:[]}): string {
    let linkArr = data.link as Array<any>;
    let link = linkArr.find(linkObj => linkObj.relation === "next");
    return link ? link.url : null;
  }

  // This method takes in an array of objects and generates a list of Patients from the data
  private decodePatients(data: any[]): Patient[] {
    console.log(data);
    return data.map(patientResource => {
      // extract required attributes
      let id = patientResource.id;
      let name = (patientResource.name as any[]).map(nameResource => new Name(nameResource.family, nameResource.given, nameResource.prefix, nameResource.use));
      let gender = patientResource.gender;
      let birthDate = patientResource.birthDate;
      let address = (patientResource.address as any[]).map(addressResource => new Address(addressResource.line, addressResource.city, addressResource.state, addressResource.postalCode, addressResource.country));

      // initialise Patient object
      return new Patient(id, name, gender, birthDate, address);
    });
  }

  private decodePractitioner(data: any[]): Practitioner {
    let practitionerResource = data[0];
    let identifier = new Identifier(practitionerResource.identifier.system, practitionerResource.identifier.value)
    let ids = data.map(practitioner => practitioner.id);
    let name = (practitionerResource.name as any[]).map(nameResource => new Name(nameResource.family, nameResource.given, nameResource.prefix, nameResource.use));
    let address = (practitionerResource.address as any[]).map(addressResource => new Address(addressResource.line, addressResource.city, addressResource.state, addressResource.postalCode, addressResource.country));
    console.log(practitionerResource)
    return new Practitioner(identifier, ids, name, address);
  }

  /**
   * Fetches an array of all associated IDs of a target practitioner
   *
   * @param {Identifier} practitionerIdentifier unique identifier corresponding to target Practitioner
   * @returns {Promise<MaybePractitioner>} returns a promise containing a MaybePractitioner that can take the form of a Practitioner if found, undefined if not fetched and null if not found
   * @memberof FHIRServer
   */
  async getPractitioner(practitionerIdentifier: Identifier): Promise<MaybePractitioner> {

    let resources: any[] = [];
    let nextUrl = `${this.rootUrl}/Practitioner?identifier=${practitionerIdentifier.toString()}&_count=${config.countPerPage}`

    while (nextUrl) {
      // iterate through each page, adding ids to array
      let response = await axios.get(nextUrl);
      let entries = response.data.entry as Array<any>;
      if (!entries) {
        return null;
      }
      resources = resources.concat(entries.map(entry => entry.resource));

      // extract next page url
      nextUrl = this.extractNextUrl(response.data);
    }

    return this.decodePractitioner(resources);
  }

  /**
   * Fetches a list of all patients associated with a target Practitioner
   *
  * @param {string[]} practitionerIDs list of IDs associated to target Practitione
   * @param {(data: Patient[], progress: Progress) => void} progressCallback
   * @returns {Promise<Patient[]>} returns a promise containing an array of all the Patients associated with the target Practitioner
   * @memberof FHIRServer
   */
  async getPatientList(practitionerIDs: string[], progressCallback: (data: Patient[], progress: Progress) => void): Promise<Patient[]> {

    let patients: Patient[] = [];
    // get all the assiocated IDS to the unique Identifier
    let ids = practitionerIDs.join(',');

    // url to find all Patients that have an encounter with the target Practitioner
    let nextUrl = `${this.rootUrl}/Patient?_has:Encounter:patient:practitioner=${ids}`

    while (nextUrl) {
      // iterate through each page, adding new patients to array
      let response = await axios.get(nextUrl);
      let entries = response.data.entry as Array<any>;

      // generate Patient objects from data recieved from server
      let decodedPatients = this.decodePatients(entries.map(entry => entry.resource));
      let total = response.data.total;
      patients = patients.concat(decodedPatients);
      progressCallback(decodedPatients, { loaded: patients.length, total: total });
      
      // extract next page url
      nextUrl = this.extractNextUrl(response.data);
    }

    return patients;
  }
      
  /**
   * Fetches the latest cholesterol reading of target Patient, if available
   *
   * @param {string} patientID unique ID corresponding to target Patient
   * @returns {Promise<Observation | null>} returns a promise containing an Observation with the latest cholesterol reading of the target Patient(if available)
   * @memberof FHIRServer
   */
  async getCholesterol(patientID: string): Promise<Observation | null> {
    // retrieve the latest cholesterol reading for given patient
    let response = await axios.get(
      `${this.rootUrl}/Observation?patient=${patientID}&code=2093-3&_sort=-date&_count=1`
    )

    if (!response.data.entry) {
      // if the patient does not have any cholesterol measurements, return null
      return null;
    }

    // extract the Observationg and Measurement to initialise respective objects
    let observation = response.data.entry[0].resource;
    let effectiveDateTime = observation.effectiveDateTime;
    let value = new Measurement(observation.valueQuantity.unit, observation.valueQuantity.value);

    return new Observation(value, effectiveDateTime);
  }

}
