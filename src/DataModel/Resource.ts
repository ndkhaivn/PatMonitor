/**
 * Class representing a unique identifier from an associated system
 *
 * @export
 * @class Identifier
 */
export class Identifier {
  system: string
  value: string

  /**
   *Creates an instance of Identifier.
   * @param {string} system a string representing the system to which the identifier belongs
   * @param {string} value a string representing the value of the identiifer from the associated system
   * @memberof Identifier
   */
  constructor(system: string, value: string) {
    this.system = system;
    this.value = value;
  }
 
  /**
   * Returns a string containing the system and value of the Identifier
   * 
   * @returns {string} returns a string with concatenated system and value
   * @memberof Identifier
   */
  toString(): string {
    return this.system + '|' + this.value;
  }
}
/**
 * Class representing an Address containing all associated address fields
 *
 * @export
 * @class Address
 */
export class Address {
  line: string[]
  city: string
  state: string
  postalCode: string
  country: string

/**
 *Creates an instance of Address.
 * @param {string[]} newLine array of strings representing street address lines
 * @param {string} newCity string representing the city
 * @param {string} newState string representing the state
 * @param {string} newPostalCode string representing the postal code
 * @param {string} newCountry string representing the country
 * @memberof Address
 */
constructor(newLine: string[], newCity: string, newState: string, newPostalCode: string, newCountry: string) {
    this.line = newLine;
    this.city = newCity;
    this.state = newState;
    this.postalCode = newPostalCode;
    this.country = newCountry;
  }
}
/**
 * Class representing a decomposed name
 *
 * @export
 * @class Name
 */
export class Name {
  family: string
  given: string[]
  prefix: string[]
  use: string
/**
 *Creates an instance of Name.
 * @param {string} newFamily string represenintg family name
 * @param {string[]} newGiven array of strings representing given name/s
 * @param {string[]} newPrefix array of strings representing prefix/s
 * @param {string} newUse string representing the use case of the name
 * @memberof Name
 */
constructor(newFamily: string, newGiven: string[], newPrefix: string[], newUse: string) {
    this.family = newFamily;
    this.given = newGiven;
    this.prefix = newPrefix;
    this.use = newUse;

  }
/**
 * Returns a displayable concatenated name
 *
 * @returns {string} returns a string with prefix, given and family name concatenated
 * @memberof Name
 */
toString(): string {
    return `${this.prefix ? this.prefix.join(" ") : ""} ${this.given ? this.given.join(" ") : ""} ${this.family}`;
  }
}
/**
 * Class that represents a quantitative measurement
 *
 * @export
 * @class Measurement
 */
export class Measurement {
  unit: string
  value: number
/**
 *Creates an instance of Measurement.
 * @param {string} newUnit string representing the unit of measurement
 * @param {number} newValue number representing the numerical value of the measurement
 * @memberof Measurement
 */
constructor(newUnit: string, newValue: number) {
    this.unit = newUnit;
    this.value = newValue;
  }
/**
 * Returns a string with a displayable measurement
 *
 * @returns {string} returns a string with the value and units of the measurement concatenated
 * @memberof Measurement
 */
toString(): string {
    return this.value + " " + this.unit;
  }
}
/**
 * Class representing an Observation 
 *
 * @export
 * @class Observation
 */
export class Observation {
  effectiveDateTime: string
  value: Measurement
/**
 *Creates an instance of Observation.
 * @param {Measurement} value Measurement that represents the measurement taken during the Observation
 * @param {string} effectiveDateTime string representing the time that the Observation occurred
 * @memberof Observation
 */
constructor(value: Measurement, effectiveDateTime: string) {
    this.value = value;
    this.effectiveDateTime = effectiveDateTime;
  }
}