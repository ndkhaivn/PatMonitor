import Patient from "./Patient";
import { Identifier, Observation, BloodPressure } from './Resource';
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
     * @returns {Promise<MaybePractitioner>} returns a promise containing a MaybePractitioner that can take the form of a Practitioner if found, undefined if not fetched and null if not found
     * @memberof DataSource
     */
    getPractitioner(practitionerIdentifier: Identifier): Promise<MaybePractitioner>

    /**
     * Fetches a list of all patients associated with a target Practitioner
     *
     * @param {string[]} practitionerIDs list of IDs associated to target Practitioner
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

    /**
     *
     *
     * @param {string} patientID unique ID corresponding to target Patient
     * @param {number} count number representing number of observations wanting to be obtained
     * @returns {(Promise<BloodPressure[] | null>)} returns array of Blood Pressure readings, ordered from newest to oldest
     * @memberof FHIRServer
     */
    getBloodPressure(patientID: string, count: number): Promise<BloodPressure[] | null>;

}

// Creating and exporting the dataSource instance - a DataSource singleton for the whole app
export const dataSource: DataSource = new FHIRServer();