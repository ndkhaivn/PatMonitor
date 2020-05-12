import { checkServerIdentity } from "tls";
import DataSource from "./DataSource";
import PatientInfo from "./PatientInfo";
import Cholesterol from "./Cholesterol";

export default class Patient {
  id: string | "";
  displayName: string | undefined;
  dataSource: DataSource | undefined;

  totalChol: Cholesterol | undefined;

  patientInfo: PatientInfo | undefined;
  
  constructor(newId: string, newDisplayName: string, newDataSource: DataSource) {
    this.id = newId;
    this.displayName = newDisplayName;
    this.dataSource = newDataSource;
  }

  getCholesterol() {
    this.dataSource?.getCholesterol(this.id).then(result => {
      this.totalChol = result;
      console.log(this.totalChol);
    }

    );
    }

  getPersonalInfo() {
    this.dataSource?.getPatientInfo(this.id).then(result => {
      this.patientInfo = result;
  });
}

}