import React, { useState } from "react";
import AudioRecorder from "../components/AudioRecorder";
import Header from "../components/Header";
import withProtected from "../hoc/withProtected";

const rekaman = () => {
  let [recordOption, setRecordOption] = useState("audio");
  const toggleRecordOption = (type) => {
    return () => {
      setRecordOption(type);
    };
  };
  return (
    <div className="bg-gray-100 min-h-screen">
      <div>
        <Header />
      </div>
      <div>{recordOption === "audio" ? <AudioRecorder /> : null}</div>
    </div>
  );
};

export default withProtected(rekaman);
