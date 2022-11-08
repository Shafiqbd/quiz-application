import classes from "../styles/Question.module.css";
import Answers from "./Answers";

export default function Question({ answares }) {
  console.log(answares);
  return answares.map((answare, index) => (
    <div className={classes.question} key={index}>
      <div className={classes.qtitle}>
        <span className="material-icons-outlined"> help_outline </span>
        {answare.title}
      </div>
      <Answers options={answare.options} input={false} />
    </div>
  ));
}
