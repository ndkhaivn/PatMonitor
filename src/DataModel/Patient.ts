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
  isMonitored: boolean;
  totalCholesterol: Observation | undefined | null;
  cholesterolLoading: boolean;
  bloodPressure: BloodPressure | undefined | null;

  /**
   *Creates an instance of Patient.
   * @param {string} newId unique ID associated with Patient
   * @param {Name[]} newName Name of Patient
   * @param {string} newGender string representing gender of Patient
   * @param {string} newBirthDate string representing birth date of Patient
   * @param {Address[]} newAddress Address of Patient
   * @memberof Patient
   */
  constructor(newId: string, newName: Name[], newGender: string, newBirthDate: string, newAddress:Address[]) {
    this.id = newId;
    this.name = newName;
    this.gender = newGender;
    this.birthDate = newBirthDate;
    this.address = newAddress;
    this.isMonitored = false;
    this.cholesterolLoading = false;
  }
}