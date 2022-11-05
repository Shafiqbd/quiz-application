import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import useVideoList from "../hooks/useVideoList";
import Video from "./Video";

export default function Videos() {
  const [page, setPage] = useState(1);
  const { loading, videos, error, hasMore } = useVideoList(page);
  console.log("page", videos);

  return (
    <>
      {videos.length > 0 && (
        <InfiniteScroll dataLength={videos.length} next={() => setPage(page + 8)} hasMore={hasMore}>
          {videos.map((video) =>
            video.noq > 0 ? (
              <Link to="/quiz" key={video.youtubeID}>
                <Video video={video} />
              </Link>
            ) : (
              <Video video={video} key={video.youtubeID} />
            )
          )}
          ;
        </InfiniteScroll>
      )}
      {!loading && videos.length === 0 && <div>No data found!</div>}
      {error && <div>There was an error!</div>}
      {loading && <div>Loading...</div>}
    </>
  );
}
