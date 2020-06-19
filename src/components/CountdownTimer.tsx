import React from 'react'
import { useSelector } from 'react-redux';
import { ApplicationState } from '../store/index';


/**
 * Pad the number with a leading zero (2 digits in total)
 *
 * @param {number} num
 */
function pad2(num: number): string {
  if (num < 10) {
    return "0" + num;
  } else {
    return String(num)
  }
}


/**
 *
 * CountdownTimer component
 * Display a countdown timer for the system's update
 */
export default function CountdownTimer() {

  let timeLeft = useSelector((state: ApplicationState) => state.system.timeLeft);

  if (!timeLeft) {
    timeLeft = 0;
  }

  const hh = pad2(Math.floor(timeLeft / 3600));       // hour
  const mm = pad2(Math.floor((timeLeft / 60) % 60));  // minute
  const ss = pad2(Math.floor(timeLeft % 60));         // second

  const clock = `${hh}:${mm}:${ss}`

  return (
    <div>
      <h2 className="text-center bp3-monospace-text"> {clock} </h2>
    </div>
  )
}
