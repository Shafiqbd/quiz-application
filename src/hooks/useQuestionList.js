import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function useQuestionList(videoID) {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchVideos() {
      // database related works
      const db = getDatabase();
      const answareRef = ref(db, "quiz/" + videoID + "/questions");
      const answareQuery = query(answareRef, orderByKey());
      try {
        setError(false);
        //request firebase database
        const snapshot = await get(answareQuery);
        setLoading(false);
        if (snapshot.exists()) {
          setQuestions((prevQues) => {
            return [...prevQues, ...Object.values(snapshot.val())];
          });
        } else {
        }
      } catch (error) {
        console.log("error", error);
        setLoading(false);
        setError(true);
      }
    }
    // setTimeout(()=>{})
    fetchVideos();
  }, [videoID]);

  return { loading, questions, error };
}
