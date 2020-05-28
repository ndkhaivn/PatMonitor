import { Identifier, Name, Address } from './Resource';

export class Practitioner {
  identifier: Identifier
  ids: string[]
  name: Name[]
  address: Address[]

  constructor(identifier: Identifier, ids: string[], name: Name[], address: Address[]) {
    this.identifier = identifier;
    this.ids = ids;
    this.name = name;
    this.address = address;
  }
}

export type MaybePractitioner = Practitioner | undefined | null;