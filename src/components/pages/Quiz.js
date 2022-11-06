import _ from "lodash";
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
    case "answare":
      const cloneQuestion = _.cloneDeep(state);
      cloneQuestion[action.questionId].options[action.optionIndex].checked = action.value;
      return cloneQuestion;

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

  const handleAnswerChange = (e, index) => {
    console.log("e", e, index);
    dispatch({
      type: "answare",
      questionId: currentQues,
      optionIndex: index,
      value: e.target.checked,
    });
  };

  // const nextQuestion = () => {
  //   debugger;
  //   if (currentQues + 1 < questions.length) {
  //     setCurrentQues((prevQues) => prevQues + 1);
  //   }
  // };

  const nextQuestion = () => {
    if (currentQues + 1 < questions.length) {
      setCurrentQues((prevCurrent) => prevCurrent + 1);
    }
  };
  const prevQuestion = () => {
    debugger;
    if (currentQues >= 1 && currentQues <= questions.length) {
      setCurrentQues((current) => current - 1);
    }
  };

  const anwsareSubmit = () => {};

  const percentage = questions.length > 0 ? ((currentQues + 1) / questions.length) * 100 : 0;

  return (
    <>
      {!loading && questions.length === 0 && <div>No data found!</div>}
      {error && <div>There was an error!</div>}
      {loading && <div>Loading...</div>}
      {!loading && !error && qNa && qNa.length > 0 && (
        <>
          <h1>{qNa[currentQues].title}</h1>
          <h4>Question can have multiple answers</h4>
          <Answers options={qNa[currentQues].options} handleChange={handleAnswerChange} />
          <ProgressBar progress={percentage} next={nextQuestion} prev={prevQuestion} submit={anwsareSubmit} />
          <MiniPlayer />
        </>
      )}
    </>
  );
}
