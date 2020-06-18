import { DataSource } from './DataSource';

import Patient from './Patient';
import axios from 'axios';
import config from "../config";
import { Identifier, Name, Address, Measurement, Observation, Coding, BloodPressure } from './Resource';
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
    console.log(data, ids);
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

    let coding = observation.code.coding[0];
    coding = new Coding(coding.code, coding.display, coding.system);
    return new Observation(value, effectiveDateTime, coding);
  }

  /**
   *
   *
   * @param {string} patientID unique ID corresponding to target Patient
   * @param {number} count number representing number of observations wanting to be obtained
   * @returns {(Promise<BloodPressure[] | null>)} returns array of Blood Pressure readings, ordered from newest to oldest
   * @memberof FHIRServer
   */
  async getBloodPressure(patientID: string, count: number): Promise<BloodPressure[] | null> {
    // defined codes for blood pressure readings
    let codeSystem = "http://loinc.org";
    let diastolicCode = "8462-4";
    let systolicCode = "8480-6";

    let bloodPressures;

    // retrieve the latest count number of blood pressure readings for given patient
    let response = await axios.get(
      `${this.rootUrl}/Observation?patient=${patientID}&code=55284-4&_sort=-date&_count=` + count
    )
      
    
    if (response.data.entry) {
      // if the patient has blood pressure records
      bloodPressures = [];
      let entries = response.data.entry as Array<any>;
      entries = entries.map(entry => entry.resource);

      // create BloodPressure object for each reading
      entries.forEach(observation => {
        let effectiveDateTime, value, coding;
        effectiveDateTime = observation.effectiveDateTime;
        let components = observation.component as Array<any>;

        // create Diastolic Observation
        let diastolicObs = components.find(comp => comp.code.coding[0].code === diastolicCode && comp.code.coding[0].system === codeSystem);
        value = new Measurement(diastolicObs.valueQuantity.unit, diastolicObs.valueQuantity.value);
        coding = diastolicObs.code.coding[0];
        coding = new Coding(coding.code, coding.display, coding.system);
        diastolicObs = new Observation(value, effectiveDateTime, coding);

        // create Systolic Observation
        let systolicObs = components.find(comp => comp.code.coding[0].code === systolicCode && comp.code.coding[0].system === codeSystem);
        value = new Measurement(systolicObs.valueQuantity.unit, systolicObs.valueQuantity.value);
        coding = systolicObs.code.coding[0];
        coding = new Coding(coding.code, coding.display, coding.system);
        systolicObs = new Observation(value, effectiveDateTime, coding);

        // create BloodPressure object
        bloodPressures.push(new BloodPressure(diastolicObs, systolicObs));        
      });
           
    } else {
      // if the patient does not have any blood pressure measurements, return null
      bloodPressures = null;
    }

    return bloodPressures;
  }

}
