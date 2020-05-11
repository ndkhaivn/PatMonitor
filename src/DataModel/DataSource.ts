export{}
import Patient from "./Patient";

export default interface DataSource {
    getPatientList(pracIdentifier: string): Promise<any>;

    getPatientInfo(patientID: string): string;
    
    getCholesterol(patientID: string): string;
    


}