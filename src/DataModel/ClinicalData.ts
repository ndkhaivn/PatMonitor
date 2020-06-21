export default class ClinicalData<T> {
  monitored: boolean;         // system use this to determine whether fetch data for this patient or not
  loading: boolean;           // views can display a loading spinner when it's loading
  data: T | undefined | null; // actual data to display
  
  constructor() {
    this.monitored = false;
    this.loading = false;
  }
}