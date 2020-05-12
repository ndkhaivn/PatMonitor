import DataSource from './DataSource';

import Patient from './Patient';
import axios from 'axios';
import PatientInfo from './PatientInfo';
import Cholesterol from './Cholesterol';
import { elementIsOrContains } from '@blueprintjs/core/lib/esm/common/utils';

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
        "Encounter?participant.identifier=" + this.idSystem + "|" + pracIdentifier + "&_count=200&_include=Encounter.participant.individual&_include=Encounter.patient"
    )

    let linkArr = res.data.link as Array<any>;
    let link = linkArr.find(linkObj => linkObj.relation == "next");
    let nextUrl = link.url;
    let entries = res.data.entry as Array<any>;
    patients = patients.concat(entries.map(entry => entry.resource.subject));

    let counter = 0;

    while (counter<2) {
      counter++;
      entries = res.data.entry as Array<any>;
      patients = patients.concat(entries.map(entry => entry.resource.subject));
      res = await axios.get(nextUrl);
      linkArr = res.data.link as Array<any>;
      link = linkArr.find(linkObj => linkObj.relation == "next");
      if (!link) {
        break;
      }
      nextUrl = link.url;
    }
    let uniqueIDs = new Set();
    patients.forEach(patient => uniqueIDs.add(patient.reference))

    let uniquePatients:any[] = []
    uniqueIDs.forEach(patient => {
      let currentPatient = patients.find(obj => obj.reference == patient)
      currentPatient.reference = currentPatient.reference.split("/")[1]
      uniquePatients.push(currentPatient)
    });

    return uniquePatients;
  }

  async getPatientInfo(patientID: string): Promise<any> {
    // make request
    let res = await axios.get(
      this.rootUrl + "Patient/" + patientID
    )

    // extract patient data
    let patient = res.data;

    let birthDate = patient.birthDate;
    let gender = patient.gender;
    let address = {
      line: patient.address[0].line,
      city: patient.address[0].city,
      state: patient.address[0].state,
      country: patient.address[0].country
    }


    // instantiate patientInfo
    let patientInfo = new PatientInfo(birthDate, gender, address);

    return patientInfo;
  }

  async getCholesterol(patientID: string): Promise<any> {
    // make request
    let res = await axios.get(
      this.rootUrl +  "Observation?patient=" + patientID + "&code=2093-3&_sort=date"
    )
    
    // extract latest observation
    let totalObs = res.data.total;
    let data = res.data.entry as Array<any>;
    let latestObs = data[totalObs - 1];

    // instantiate cholesterol
    let time = latestObs.resource.effectiveDateTime;
    let value = latestObs.resource.valueQuantity.value;
    let unit = latestObs.resource.valueQuantity.unit;
    let cholesterol = new Cholesterol(time, value, unit);

    return cholesterol;
  }

}
