import { checkServerIdentity } from 'tls';
import DataSource from './DataSource';
import Cholesterol from './Cholesterol';
import { Name, Address } from './Resource';

export default class Patient {
  id: string
  name: Name[]
  gender: string
  birthDate: string
  address: Address[]
  isMonitored: boolean;

  constructor(patientObj: any) {
    this.id = patientObj.id;
    this.name = patientObj.name;
    this.gender = patientObj.gender;
    this.birthDate = patientObj.birthDate;
    this.address = patientObj.address;
    this.isMonitored = false;
  }
}