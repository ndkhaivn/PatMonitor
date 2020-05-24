import Patient from "./Patient";
import { Identifier, Observation } from './Resource';
import { Progress } from "../store/patients/types";
/**
 *Interface that represents data source which stores the medical records
 *
 * @export
 * @interface DataSource
 */
export default interface DataSource {
    /**
     * Fetches an array of all associated IDs of a target practitioner
     *
     * @param {Identifier} practitionerIdentifier unique identifier corresponding to target Practitioner
     * @returns {Promise<string[]>} returns a promise containing an array of all the IDs associated with the target Practitioner
     * @memberof DataSource
     */
    getPractitionerIDs(practitionerIdentifier: Identifier): Promise<string[]>
    /**
     * Fetches a list of all patients associated with a target Practitioner
     *
     * @param {Identifier} pracIdentifier unique identifier corresponding to target Practitioner
     * @param {(data: Patient[], progress: Progress) => void} progressCallback
     * @returns {Promise<Patient[]>} returns a promise containing an array of all the Patients associated with the target Practitioner
     * @memberof DataSource
     */
    getPatientList(pracIdentifier: Identifier, 
            progressCallback: (data: Patient[], progress: Progress) => void): Promise<Patient[]>;
    
    /**
     * Fetches the latest cholesterol reading of target Patient, if available
     *
     * @param {string} patientID unique ID corresponding to target Patient
     * @returns {Promise<any>} returns a promise containing the latest cholesterol reading of the target Patient(if available)
     * @memberof DataSource
     */
    getCholesterol(patientID: string): Promise<Observation>;
}