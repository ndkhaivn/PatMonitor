import React from "react"
import { useSelector } from 'react-redux';
import { ApplicationState } from '../store/index';
import Patient from '../DataModel/Patient';
import ReactApexChart from 'react-apexcharts';
import { H3 } from '@blueprintjs/core';

/**
*
* CholesterolBarChart component
* Displaying monitored patients by cholesterol value in a bar chart
* The chart will be updated along with the system's timer
*/
export default function CholesterolBarChart() {

  // Connect to the store to get the patient list
  let patients: Patient[] = useSelector((state: ApplicationState) => state.patients.data);
  // Only display monitored patients and patients with at least one cholesterol observation
  patients = patients.filter(patient => patient.cholesterol.monitored && patient.cholesterol.data);

  // chart data
  let series = [{
    name: 'Cholesterol Level',
    data: patients.map(patient => {
      if (patient.cholesterol.loading) {
        return 0
      }
      return patient.cholesterol.data!.value.value
    })
  }];

  // chart options
  let options = {
    chart: {
      type: 'bar',
      height: 600,
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
          return val + " mg/dL";
        }
      }
    },
    yaxis: {
      max: 300
    }
  };

  return (
    <div id="chart">
      <H3 className="text-center"> CHOLESTEROL MONITOR </H3>
      {patients.length > 0 && <ReactApexChart options={options} series={series} type="bar" height={600} />}
    </div>
  )
}
