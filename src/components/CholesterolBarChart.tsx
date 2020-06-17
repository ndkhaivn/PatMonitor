import React from "react"
import { useSelector } from 'react-redux';
import { ApplicationState } from '../store/index';
import Patient from '../DataModel/Patient';
import ReactApexChart from 'react-apexcharts';

export default function CholesterolBarChart() {

  // Connect to the store to get the patient list
  let patients: Patient[] = useSelector((state: ApplicationState) => state.patients.data);
  // Only display monitored patients and patients with at least one cholesterol observation
  patients = patients.filter(patient => patient.isMonitoredCholesterol === true && patient.totalCholesterol);

  let series = [{
    name: 'Cholesterol Level',
    data: patients.map(patient => patient.totalCholesterol!.value.value)
  }];

  let options = {
    chart: {
      type: 'bar',
      height: 500,
    },
    title: {
      text: 'Cholesterol Level',
      floating: true,
      align: 'center'
    },
    xaxis: {
      categories: patients.map(patient => patient.name[0].toString()),
    },
    tooltip: {
      y: {
        formatter: function (val: string) {
          return val + "mg/dL";
        }
      }
    }
  };

  return (
    <div id="chart">
      {patients.length > 0 && <ReactApexChart options={options} series={series} type="bar" height={500} />}
    </div>
  )
}