import DataSource from './DataSource';

import Patient from './Patient';
import axios from 'axios';

export default class FHIRServer implements DataSource {
  rootUrl: string;
  idSystem: string;
  constructor(url: string, idUrl: string) {
    this.rootUrl = url;
    this.idSystem = idUrl;
  }

  async getPatientList(pracIdentifier: string): Promise<any> {

    let patients: any[] = [];

    let res = await axios.get(
      this.rootUrl +
        'Encounter?participant.identifier=http://hl7.org/fhir/sid/us-npi|500&_count=200&_include=Encounter.participant.individual&_include=Encounter.patient'
    )

    let linkArr = res.data.link as Array<any>;
    let link = linkArr.find(linkObj => linkObj.relation == "next");
    let nextUrl = link.url;
    let entries = res.data.entry as Array<any>;
    patients = patients.concat(entries.map(entry => entry.resource));
    console.log(res.data);

    let counter = 0;

    while (1) {
      counter++;
      entries = res.data.entry as Array<any>;
      patients = patients.concat(entries.map(entry => entry.resource));
      console.log(counter, res.data);
      res = await axios.get(nextUrl);
      linkArr = res.data.link as Array<any>;
      link = linkArr.find(linkObj => linkObj.relation == "next");
      if (!link) {
        break;
      }
      nextUrl = link.url;
    }

    // patients.sort();

    return patients;
  }

  getPatientInfo(patientID: string): string {
    throw new Error('Method not implemented.');
  }

  getCholesterol(patientID: string): string {
    // request Observations regarding cholesterol of patient sort by date
    // url: rootUrl + "Observation?patient=" + patient_id + "&code=2093-3&_sort=date&_count=13"

    throw new Error('Method not implemented.');
  }

  async httpRequest(relPath: string, callback: Function) {}
}
