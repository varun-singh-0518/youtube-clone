import React from "react";

// moment library is used for working with dates and times.
import moment from "moment";

// It takes a single prop, time, which represents the length of the video in seconds.
const VideoLength = ({time}) => {
  const videoLengthInSeconds = moment()
    .startOf("day")
    .seconds(time)
    .format("H:mm:ss");

  return (
    <div className=" absolute bottom-2 right-2 bg-black py-1 px-2 text-white text-xs rounded-md">
      {videoLengthInSeconds}
    </div>
  );
};

export default VideoLength;
