export default class PatientInfo {
  birthdate: string | undefined;
  gender: string | undefined;
  address: {
    line: string[] | undefined,
    city: string | undefined,
    state: string |undefined,
    country: string | undefined
  } | {};

  constructor(newBirthdate: string, newGender: string, newAddress: {line: string[]
    city: string
    state: string
    country: string}) {
    this.birthdate = newBirthdate;
    this.gender = newGender;
    this.address = newAddress;
  }

}