import { Name, Address, Observation, BloodPressure } from './Resource';
/**
 * Class that represents a Patient in the medical record system
 *
 * @export
 * @class Patient
 */
export default class Patient {
  id: string
  name: Name[]
  gender: string
  birthDate: string
  address: Address[]
  isMonitoredCholesterol: boolean;
  isMonitoredBloodPressure: boolean;
  totalCholesterol: Observation | undefined | null;
  cholesterolLoading: boolean;
  bloodPressure: BloodPressure[] | undefined | null;
  bloodPressureLoading: boolean;

  /**
   *Creates an instance of Patient.
   * @param {string} id unique ID associated with Patient
   * @param {Name[]} name Name of Patient
   * @param {string} gender string representing gender of Patient
   * @param {string} birthDate string representing birth date of Patient
   * @param {Address[]} address Address of Patient
   * @memberof Patient
   */
  constructor(id: string, name: Name[], gender: string, birthDate: string, address:Address[]) {
    this.id = id;
    this.name = name;
    this.gender = gender;
    this.birthDate = birthDate;
    this.address = address;
    this.isMonitoredCholesterol = false;
    this.isMonitoredBloodPressure = false;
    this.cholesterolLoading = false;
    this.bloodPressureLoading = false;
  }
}