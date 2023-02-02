import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Navigate} from 'react-router-dom'
import { next, prev } from "../redux/questionReducer";
import { storeResult } from "../redux/resultReducer";
import Questions from "./Questions";
import Result from "./Result";

function Quiz() {
  const dispatch = useDispatch();
  const [checkedOption, setCheckedOption] = useState(undefined);
  const state = useSelector((state) => state);
  const { trace, questions } = useSelector((state) => state.questions);
  const { result } = useSelector((state) => state.result);
  console.log(state);

  const Prev = () => {
    if (trace > 0) {
      dispatch(prev());
    }
  };

  const Next = () => {
    if (trace < questions.length) {
      console.log(checkedOption);
      dispatch(storeResult(checkedOption)); // a create this function to pass the error of the immer ...
      dispatch(next());
    }
  };

  if(result.length && result.length >= questions.length){
     return  <Navigate to={'/result'} replace={true}></Navigate>
  }

  const onChek = (check) => {
    setCheckedOption(check);
  };

  return trace > questions.length ? (
    <Result />
  ) : (
    <div>
      <Questions onChek={onChek} />
      <input
        type={"button"}
        disabled={trace == 0 ? true : false}
        value="Prev"
        onClick={Prev}
      />
      <input
        type={"button"}
        disabled={trace == questions.length ? true : false}
        value="Next"
        onClick={Next}
      />
    </div>
  );
}

export default Quiz;
