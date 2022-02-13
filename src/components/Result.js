import React from 'react'

export default function Result({show = false, minutes,seconds}) {

  let msg = "\n\n";
  
  if(minutes === 0){
    if(seconds <= 25){
      msg += "Dayum, impressed xD";
    }
    else{
      msg += "That was quick :D"
    }
  }
  else if(minutes === 1){
    msg += "People have solved it in less than 1 minute tho :)";
  }
  else{
    msg += "You can do better hehe";
  }

  if(show){
    return (
        <div className="result">
            You took {minutes>0 ? Math.round(minutes)+" minutes and " : ""} {Math.round(seconds)} seconds!
            {msg}
        </div>
      )
  }
  else
    return null;
}
