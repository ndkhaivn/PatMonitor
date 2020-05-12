import { checkServerIdentity } from "tls";
import DataSource from "./DataSource";
import PatientInfo from "./PatientInfo";
import Cholesterol from "./Cholesterol";

export default class Patient {
  id: string | undefined;
  displayName: string | undefined;
  dataSource: DataSource | undefined;

  totalChol: Cholesterol | undefined;

  patientInfo: PatientInfo | undefined;
  
  constructor(newId: string, newDisplayName: string, newDataSource: DataSource) {
    this.id = newId;
    this.displayName = newDisplayName;
    this.dataSource;
  }

  getCholesterol() {
  }

  getPersonalInfo() {
  }

}