import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { resetAll } from '../redux/questionReducer'
import { resetResult } from '../redux/resultReducer'

function Result() {
     const dispatch=useDispatch()
     const Restart=()=>{
           dispatch(resetAll())
           dispatch(resetResult())
     }

  return (
    <div>
        <p>UserName</p>
        <p>ToTal Questions</p>
        <p>Total Answered</p>
        <p>Quiz Result</p>
        <Link to={'/'} onClick={Restart}>Restart</Link>
    </div>
  )
}

export default Result