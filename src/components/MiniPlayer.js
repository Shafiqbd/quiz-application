import { useRef, useState } from "react";
import ReactPlayer from "react-player/youtube";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import classes from "../styles/MiniPlayer.module.css";

export default function MiniPlayer({ id, title }) {
  const [status, setStatus] = useState(false);
  const miniPlayerRef = useRef();
  const { location } = useHistory();
  const { state } = location;
  const { videoTitle } = state;
  const youtubeUrl = `https://youtube.com/watch?v=${id}`;
  const toggleStatus = () => {
    if (!status) {
      miniPlayerRef.current.classList.remove(classes.floatingBtn);
      setStatus(true);
    } else {
      miniPlayerRef.current.classList.add(classes.floatingBtn);
      setStatus(false);
    }
  };
  return (
    <div className={`${classes.miniPlayer} ${classes.floatingBtn}`} ref={miniPlayerRef}>
      <span className={`material-icons-outlined ${classes.open}`} onClick={toggleStatus}>
        play_circle_filled
      </span>
      <span className={`material-icons-outlined ${classes.close}`} onClick={toggleStatus}>
        close
      </span>
      <ReactPlayer className={classes.player} url={youtubeUrl} playing={status} controls width="300" height="168" />
      <p>{videoTitle}</p>
    </div>
  );
}
