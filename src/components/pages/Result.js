import _ from "lodash";
import { useHistory, useParams } from "react-router-dom";
import useAnsware from "../../hooks/useAnsware";
import Analysis from "../Analysis";
import Summary from "../Summary";

export default function Result() {
  const { location } = useHistory();
  const { state } = location;
  const { qNa } = state;
  const { id } = useParams();
  const { loading, answares, error } = useAnsware(id);
  console.log("answares", answares);

  const calculateScore = () => {
    let score = 0;
    answares.forEach((question, qInd) => {
      let correctIndex = [],
        checkIndex = [];
      question.options.forEach((option, oInd) => {
        if (option.correct) {
          correctIndex.push(oInd);
        }
        if (qNa[qInd].options[oInd].checked) {
          checkIndex.push(oInd);
          option.checked = true;
        }
      });
      if (_.isEqual(correctIndex, checkIndex)) {
        score = score + 5;
      }
    });
    return score;
  };
  const score = calculateScore();
  return (
    <>
      {!loading && answares.length === 0 && <div>No data found!</div>}
      {error && <div>There was an error!</div>}
      {loading && <div>Loading...</div>}
      {!loading && !error && answares.length > 0 && (
        <>
          <Summary score={score} noq={answares.length} />
          <Analysis />
        </>
      )}
    </>
  );
}
