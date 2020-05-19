import { Name, Address, Observation } from './Resource';

export default class Patient {
  id: string
  name: Name[]
  gender: string
  birthDate: string
  address: Address[]
  isMonitored: boolean;
  totalCholesterol: Observation | undefined | null;
  loading: boolean;

  constructor(patientObj: any) {
    this.id = patientObj.id;
    this.name = patientObj.name;
    this.gender = patientObj.gender;
    this.birthDate = patientObj.birthDate;
    this.address = patientObj.address;
    this.isMonitored = false;
    this.loading = false;
  }
}