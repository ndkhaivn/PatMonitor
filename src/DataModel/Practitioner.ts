import { Identifier, Name, Address } from './Resource';
/**
 * Class that represents a Patient in the medical record system
 *
 * @export
 * @class Practitioner
 */
export class Practitioner {
  identifier: Identifier
  ids: string[]
  name: Name[]
  address: Address[]
/**
 *Creates an instance of Practitioner.
 * @param {Identifier} identifier
 * @param {string[]} ids
 * @param {Name[]} name
 * @param {Address[]} address
 * @memberof Practitioner
 */
constructor(identifier: Identifier, ids: string[], name: Name[], address: Address[]) {
    this.identifier = identifier;
    this.ids = ids;
    this.name = name;
    this.address = address;
  }
}

// undefined: Practitioner is not fetched yet
// null: Practitioner not found
export type MaybePractitioner = Practitioner | undefined | null;