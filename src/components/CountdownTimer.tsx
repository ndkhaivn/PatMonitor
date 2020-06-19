import React from 'react'
import { useSelector } from 'react-redux';
import { ApplicationState } from '../store/index';

function pad2(num: number): string {
  if (num < 10) {
    return "0" + num;
  } else {
    return String(num)
  }
}

export default function CountdownTimer() {

  let timeLeft = useSelector((state: ApplicationState) => state.system.timeLeft);

  if (!timeLeft) {
    timeLeft = 0;
  }

  const hh = pad2(Math.floor(timeLeft / 3600));
  const mm = pad2(Math.floor((timeLeft / 60) % 60));
  const ss = pad2(Math.floor(timeLeft % 60));

  const clock = `${hh}:${mm}:${ss}`

  return (
    <div>
      <h2 className="text-center bp3-monospace-text"> {clock} </h2>
    </div>
  )
}
