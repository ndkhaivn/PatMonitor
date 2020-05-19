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

  constructor(addressObj: any) {
    this.line = addressObj.line;
    this.city = addressObj.city;
    this.state = addressObj.state;
    this.postalCode = addressObj.postalCode;
    this.country = addressObj.country;
  }
}

export class Name {
  family: string
  given: string[]
  prefix: string[]
  use: string

  constructor(nameObj: any) {
    this.family = nameObj.family;
    this.given = nameObj.given;
    this.prefix = nameObj.prefix;
    this.use = nameObj.use;
  }

  toString(): String {
    return `${this.prefix ? this.prefix.join(" ") : ""} ${this.given ? this.given.join(" ") : ""} ${this.family}`;
  }
}

export class Measurement {
  unit: string
  value: number

  constructor(measurementObj: any) {
    this.value = measurementObj.value;
    this.unit = measurementObj.unit;
  }

  toString(): String {
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