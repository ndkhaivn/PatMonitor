import DataSource from './DataSource';

import Patient from './Patient';
import axios from 'axios';
import config from "../config";
import { Identifier, Name, Address, Measurement, Observation } from './Resource';
import { Progress } from '../store/patients/types';

export default class FHIRServer implements DataSource {

  rootUrl: string;

  constructor() {
    this.rootUrl = config.fihrRootUrl;
  }

  extractNextUrl(data: any) {
    let linkArr = data.link as Array<any>;
    let link = linkArr.find(linkObj => linkObj.relation === "next");
    return link ? link.url : null;
  }

  decodePatients(data: any[]): Patient[] {
    return data.map(patientResource => {
      
      let id = patientResource.id;
      let name = (patientResource.name as any[]).map(nameResource => new Name(nameResource));
      let gender = patientResource.gender;
      let birthDate = patientResource.birthDate;
      let address = (patientResource.address as any[]).map(addressResource => new Address(addressResource));

      return new Patient({ id, name, gender, birthDate, address });
    });
  }

  async getPractitionerIDs(practitionerIdentifier: Identifier): Promise<string[]> {

    let ids: string[] = [];
    let nextUrl = `${this.rootUrl}/Practitioner?identifier=${practitionerIdentifier.toString()}&_count=${config.countPerPage}`

    while (nextUrl) {
      let response = await axios.get(nextUrl);
      let entries = response.data.entry as Array<any>;
      ids = ids.concat(entries.map(entry => entry.resource.id));
      nextUrl = this.extractNextUrl(response.data);
    }

    return ids;
  }

  async getPatientList(practitionerIdentifier: Identifier, progressCallback: (data: Patient[], progress: Progress) => void): Promise<Patient[]> {

    let patients: Patient[] = [];
    let ids = await this.getPractitionerIDs(practitionerIdentifier);
    let nextUrl = `${this.rootUrl}/Patient?_has:Encounter:patient:practitioner=${ids.join(',')}`

    while (nextUrl) {
      let response = await axios.get(nextUrl);
      let entries = response.data.entry as Array<any>;
      let decodedPatients = this.decodePatients(entries.map(entry => entry.resource));
      let total = response.data.total;
      patients = patients.concat(decodedPatients);
      progressCallback(decodedPatients, { loaded: patients.length, total: total });
      
      nextUrl = this.extractNextUrl(response.data);
    }

    return patients;
  }

  async getCholesterol(patientID: string): Promise<any> {
    
    let response = await axios.get(
      `${this.rootUrl}/Observation?patient=${patientID}&code=2093-3&_sort=-date&_count=1`
    )

    if (!response.data.entry) {
      return null;
    }

    let observation = response.data.entry[0].resource;

    let effectiveDateTime = observation.effectiveDateTime;
    let value = new Measurement(observation.valueQuantity);

    return new Observation(value, effectiveDateTime);
  }

}
