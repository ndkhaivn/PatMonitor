export default class Cholesterol {
  effectiveDateTime: string | undefined;
  value:number | undefined;
  unit: string | undefined;

  constructor(newEffectiveDateTime: string, newValue: number, newUnit: string) {
    this.effectiveDateTime = newEffectiveDateTime;
    this.value = newValue;
    this.unit = newUnit;
  }
}