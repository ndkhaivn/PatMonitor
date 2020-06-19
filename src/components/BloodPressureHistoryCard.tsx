import React from 'react';
import Patient from '../DataModel/Patient';
import { Button, Card, Elevation, H5, Intent, Spinner } from '@blueprintjs/core';
import ReactApexChart from 'react-apexcharts';
import { useDispatch } from 'react-redux';
import { toggleMonitorPatient } from '../store/patients/actions';
import { PatientsActionTypes } from '../store/patients/types';

export default function BloodPressureHistoryCard({ patient } : { patient: Patient }) {

  const dispatch = useDispatch();
  const closeHistory = () => {
    dispatch(toggleMonitorPatient(patient, PatientsActionTypes.TOGGLE_MONITOR_BLOOD_PRESSURE_HISTORY));
  }

  const history = patient.bloodPressure.data ? [...patient.bloodPressure.data] : [];
  history.reverse();

  const options = React.useMemo(() => ({
    chart: {
      height: 250,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    stroke: {
      curve: 'straight'
    },
    title: {
      text: 'Blood Pressure History',
      align: 'left'
    },
    xaxis: {
      categories: history?.map(obs => obs.systolic.effectiveDateTime),
      labels: {
        show: false
      }
    }
  }), [history]);

  const series = [{
    name: "Blood Pressure",
    data: history?.map(obs => obs.systolic.value.value)
  }]

  const historyLog = patient.bloodPressure.loading ? <Spinner /> : 
    history?.map(obs => 
      <p className="bp3-monospace-text">
        [{obs.systolic.effectiveDateTime}] {obs.systolic.value.toString()}
      </p>
    )
  return (
    <Card interactive={true} elevation={Elevation.TWO} className="history-card">
      <div className="history-card-content">
        <div>
          <H5> { patient.name[0].toString() } </H5>
          { historyLog }
        </div>
        <div>
          <ReactApexChart options={options} series={series} type="line" height={250} />
        </div>
        <div>
          <Button 
            intent={Intent.DANGER} 
            icon="cross"
            onClick={closeHistory}
          />
        </div>
      </div>

    </Card>
  )
}
