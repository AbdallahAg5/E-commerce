import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import data from "../data/data";
import { useFetch } from "../hooks/FetchQuestions";
import { updateResult } from "../redux/resultReducer";

function Questions({ onChek }) {
  const dispatch = useDispatch();
  const questions = useSelector(
    (state) => state.questions.questions[state.questions.trace]
  );
  const { trace } = useSelector((state) => state.questions);
  const [checked, setChecked] = useState(undefined);
  const [{ apiData, isLoading, err }] = useFetch();
  useEffect(() => {
    dispatch(updateResult({ trace, checked }));
  });

  const SelectedInput = (i) => {
    onChek(i);
    setChecked(i);
  };

  if (isLoading) return <h1>Loading</h1>;
  if (err) return <h1>{err}</h1>;
  return (
    <>
      <h1>{questions?.question}</h1>
      {questions?.options.map((e, i) => (
        <div key={i}>
          <input
            type="radio"
            value={false}
            name={`${questions?.question}`}
            id={`q${i}-option`}
            onChange={(e) => SelectedInput(i)}
          />
          <label className="text-primary" htmlFor={`q${i}-option`}>
            {e}
          </label>
        </div>
      ))}
    </>
  );
}

export default Questions;
