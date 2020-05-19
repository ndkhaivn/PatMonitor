import Patient from "./Patient";
import { Identifier } from './Resource';
import { Progress } from "../store/patients/types";

export default interface DataSource {
    getPatientList(pracIdentifier: Identifier, 
        progressCallback: (data: Patient[], progress: Progress) => void): Promise<any>;
    
    getCholesterol(patientID: string): Promise<any>;
}