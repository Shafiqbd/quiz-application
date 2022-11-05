import classes from "../styles/Answers.module.css";
import Checkbox from "./Checkbox";

export default function Answers({ options }) {
  return (
    <>
      {options.map((option) => (
        <div className={classes.answers} key={Math.random()}>
          <Checkbox className={classes.answer} text={option.title} />
        </div>
      ))}
    </>
  );
}
