import { checkServerIdentity } from "tls";
import DataSource from "./DataSource";

export default class Patient {
  id: string | undefined;
  displayName: string | undefined;
  dataSource: DataSource | undefined;

  totalChol: {
    value:number | undefined;
    unit: string | undefined;
  } | undefined;

  birthdate: string | undefined;
  gender: string | undefined;
  address: {
    line: string[] | undefined;
    city: string | undefined;
    state: string |undefined;
    country: string | undefined;
  } | undefined;
  
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