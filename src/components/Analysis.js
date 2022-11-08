import classes from "../styles/Analysis.module.css";
import Question from "./Question";

export default function Analysis({ answares }) {
  return (
    <div className={classes.analysis}>
      <h1>Question Analysis</h1>

      <Question answares={answares} />
    </div>
  );
}
