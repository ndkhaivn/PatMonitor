import DataSource from "./DataSource";

export default class Practitioner {
  identifier: string;
  dataSource: DataSource;

  constructor(id: string, newDataSource: DataSource) {
    this.identifier = id;
    this.dataSource = newDataSource;
  }


  getPatientList() {
    this.dataSource.getPatientList(this.identifier);

  }
}