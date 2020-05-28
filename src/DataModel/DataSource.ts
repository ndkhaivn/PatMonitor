import Patient from "./Patient";
import { Identifier, Observation } from './Resource';
import { Progress } from "../store/patients/types";
import FHIRServer from './FHIRServer';
import { Practitioner, MaybePractitioner } from './Practitioner';
/**
 *Interface that represents data source which stores the medical records
 *
 * @export
 * @interface DataSource
 */
export interface DataSource {
    /**
     * Fetches an array of all associated IDs of a target practitioner
     *
     * @param {Identifier} practitionerIdentifier unique identifier corresponding to target Practitioner
     * @returns {Promise<string[]>} returns a promise containing an array of all the IDs associated with the target Practitioner
     * @memberof DataSource
     */
    getPractitioner(practitionerIdentifier: Identifier): Promise<MaybePractitioner>
    /**
     * Fetches a list of all patients associated with a target Practitioner
     *
     * @param {Identifier} pracIdentifier unique identifier corresponding to target Practitioner
     * @param {(data: Patient[], progress: Progress) => void} progressCallback
     * @returns {Promise<Patient[]>} returns a promise containing an array of all the Patients associated with the target Practitioner
     * @memberof DataSource
     */
    getPatientList(practitionerIDs: string[], 
            progressCallback: (data: Patient[], progress: Progress) => void): Promise<Patient[]>;
    
    /**
     * Fetches the latest cholesterol reading of target Patient, if available
     *
     * @param {string} patientID unique ID corresponding to target Patient
     * @returns {Promise<any>} returns a promise containing the latest cholesterol reading of the target Patient(if available)
     * @memberof DataSource
     */
    getCholesterol(patientID: string): Promise<Observation | null>;
}

// Creating and exporting the dataSource instance - a DataSource singleton for the whole app
export const dataSource: DataSource = new FHIRServer();