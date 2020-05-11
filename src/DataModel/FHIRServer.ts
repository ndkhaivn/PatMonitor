import DataSource from "./DataSource";

import Patient from "./Patient";
import axios from 'axios';


export default class FHIRServer implements DataSource {
  rootUrl: string;
  idSystem: string;
  constructor(url: string, idUrl:string) {
    this.rootUrl = url; 
    this.idSystem = idUrl;
  }

  getPatientList(pracIdentifier: string): Patient[] {
    let patientArray = [];
    axios.get(this.rootUrl + "Encounter?participant.identifier=http://hl7.org/fhir/sid/us-npi|500&_include=Encounter.participant.individual&_include=Encounter.patient")
    .then(function (response) {
      console.log(response.data);
      
  });
    patientArray.push(new Patient("id", "name", this));
    return patientArray;
  }

  getPatientInfo(patientID: string): string {
      throw new Error("Method not implemented.");
  }

  getCholesterol(patientID: string): string {
      // request Observations regarding cholesterol of patient sort by date
      // url: rootUrl + "Observation?patient=" + patient_id + "&code=2093-3&_sort=date&_count=13"

      throw new Error("Method not implemented.");
  }
  


  async httpRequest(relPath: string, callback: Function) {


      
  }

}