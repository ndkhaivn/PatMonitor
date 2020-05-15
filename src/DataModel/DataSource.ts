export{}
import Patient from "./Patient";
import { Identifier } from './Resource';

export default interface DataSource {
    getPatientList(pracIdentifier: Identifier, 
        progressCallback: (data: Patient[], progress: { loaded: number, total: number }) => void): Promise<any>;
    
    getCholesterol(patientID: string): Promise<any>;
}