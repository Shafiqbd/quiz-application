import React, { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import useQuestionList from "../../hooks/useQuestionList";
import Answers from "../Answers";
import MiniPlayer from "../MiniPlayer";
import ProgressBar from "../ProgressBar";

const initialState = null;
const reducer = (state, action) => {
  switch (action.type) {
    case "questions":
      action.value.forEach((question) => {
        question.options.forEach((option) => {
          option.checked = false;
        });
      });
      return action.value;

    default:
      return state;
  }
};

export default function Quiz() {
  const { id } = useParams();
  const { loading, questions, error } = useQuestionList(id);
  const [currentQues, setCurrentQues] = useState(0);
  const [qNa, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({
      type: "questions",
      value: questions,
    });
  }, [questions, dispatch]);

  console.log("questions", qNa);

  return (
    <>
      {!loading && questions.length === 0 && <div>No data found!</div>}
      {error && <div>There was an error!</div>}
      {loading && <div>Loading...</div>}
      {!loading && !error && qNa && qNa.length > 0 && (
        <>
          <h1>{qNa[currentQues].title}</h1>
          <h4>Question can have multiple answers</h4>
          <Answers options={qNa[currentQues].options} />
          <ProgressBar />
          <MiniPlayer />
        </>
      )}
    </>
  );
}
