import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function useAnsware(videoID) {
  const [loading, setLoading] = useState(true);
  const [answares, setAnswares] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchVideos() {
      // database related works
      const db = getDatabase();
      const answareRef = ref(db, "answers/" + videoID + "/questions");
      const ansQuery = query(answareRef, orderByKey());
      try {
        setError(false);
        //request firebase database
        const snapshot = await get(ansQuery);
        setLoading(false);
        if (snapshot.exists()) {
          setAnswares((prevAns) => {
            return [...prevAns, ...Object.values(snapshot.val())];
          });
        }
      } catch (error) {
        console.log("error", error);
        setLoading(false);
        setError(true);
      }
    }
    fetchVideos();
  }, [videoID]);

  return { loading, answares, error };
}
