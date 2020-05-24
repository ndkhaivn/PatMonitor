export class Identifier {
  system: string
  value: string
  constructor(system: string, value: string) {
    this.system = system;
    this.value = value;
  }
  toString() {
    return this.system + '|' + this.value;
  }
}

export class Address {
  line: string[]
  city: string
  state: string
  postalCode: string
  country: string

  constructor(newLine: string[], newCity: string, newState: string, newPostalCode: string, newCountry: string) {
    this.line = newLine;
    this.city = newCity;
    this.state = newState;
    this.postalCode = newPostalCode;
    this.country = newCountry;
  }
}

export class Name {
  family: string
  given: string[]
  prefix: string[]
  use: string

  constructor(newFamily: string, newGiven: string[], newPrefix: string[], newUse: string) {
    this.family = newFamily;
    this.given = newGiven;
    this.prefix = newPrefix;
    this.use = newUse;

  }

  toString(): string {
    return `${this.prefix ? this.prefix.join(" ") : ""} ${this.given ? this.given.join(" ") : ""} ${this.family}`;
  }
}

export class Measurement {
  unit: string
  value: number

  constructor(newUnit: string, newValue: number) {
    this.unit = newUnit;
    this.value = newValue;
  }

  toString(): string {
    return this.value + " " + this.unit;
  }
}

export class Observation {
  effectiveDateTime: string
  value: Measurement

  constructor(value: Measurement, effectiveDateTime: string) {
    this.value = value;
    this.effectiveDateTime = effectiveDateTime;
  }
}