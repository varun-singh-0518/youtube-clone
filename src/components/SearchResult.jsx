import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Context} from "../context/contextAPI";
import {fetchDataFromApi} from "../utils/api";
import LeftNav from "./LeftNav";
import SearchResultVideoCard from "./SearchResultVideoCard";

const SearchResult = () => {
  const [result, setResult] = useState();
  const {searchQuery} = useParams();
  const {setLoading} = useContext(Context);

  useEffect(() => {
    document.getElementById("root").classList.remove("custom-h");
    fetchSearchResults();
  }, [searchQuery]);

  const fetchSearchResults = () => {
    setLoading(true);
    fetchDataFromApi(`search/?q=${searchQuery}`).then((res) => {
      console.log(res);
      // after receiving the response , it sets the result state with the content received.
      setResult(res?.contents);
      setLoading(false);
    });
  };

  return (
    <div className=" flex flex-row h-[calc(100%-56px)]">
      <LeftNav />
      <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
        {result?.map((item) => {
          // if the type of item is not video , it returns false
          if (item?.type !== "video") return false;

          // extracting the video property of item in a variable.
          let video = item?.video;
          return <SearchResultVideoCard key={video?.videoId} video={video} />;
        })}
      </div>
    </div>
  );
};

export default SearchResult;
