export default class ClinicalData<T> {
  monitored: boolean;
  loading: boolean;
  data: T | undefined | null;
  
  constructor() {
    this.monitored = false;
    this.loading = false;
  }
}