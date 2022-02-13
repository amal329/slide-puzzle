import React from 'react'

export default function Result({show = false, minutes,seconds}) {
  if(show){
    return (
        <div className="result">
            You took {minutes>0 ? Math.round(minutes)+" minutes and " : ""} {Math.round(seconds)} seconds!
        </div>
      )
  }
  else
    return null;
}
