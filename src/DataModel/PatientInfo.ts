export default class PatientInfo {
  birthdate: string | undefined;
  gender: string | undefined;
  address: {
    line: string[] | ["line"], 
    city: string |"city",
    state: string | "state",
    country: string | "country"
} ;

  constructor(newBirthdate: string, newGender: string, newAddress: {
    line: string[], 
    city: string,
    state: string,
    country: string
  }) {
    this.birthdate = newBirthdate;
    this.gender = newGender;

    this.address = newAddress;
  }

}