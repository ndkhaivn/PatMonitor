export{}
import Patient from "./Patient";

export default interface DataSource {
    getPatientList(pracIdentifier: string): Patient[];

    getPatientInfo(patientID: string): string;
    
    getCholesterol(patientID: string): string;
    


}