import React, {useContext, useEffect} from "react";
import LeftNav from "./LeftNav";
import {Context} from "../context/contextAPI";
import VideoCard from "./VideoCard";

const Feed = () => {
  const {loading, searchResults} = useContext(Context);

  useEffect(() => {
    document.getElementById("root").classList.remove("custom-h");
  }, []);

  return (
    <div className=" flex flex-row h-[calc(100%-56px)]">
      <LeftNav />
      <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
          {/*  It checks if the loading state is false and if searchResults is
          defined. 
           It also checks if the item has a type of "video." If these
          conditions are met, it renders a VideoCard component with a unique key
          and the video data from the searchResults array. */}
          {!loading &&
            searchResults &&
            searchResults?.map((item) => {
              if (item?.type !== "video") return false;
              return (
                <VideoCard key={item?.video?.videoId} video={item?.video} />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Feed;
