import React, { useState, useRef } from "react";
import {
  BsFillPlayCircleFill,
  BsFillStopCircleFill,
  BsMic,
} from "react-icons/bs";
import { storage } from "../firebase/firebase.js";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link.js";

// import '/styles/globals.css'

const mimeType = "audio/mpeg";

const AudioRecorder = () => {
  const [permission, setPermission] = useState(false);
  const [stream, setStream] = useState(null);
  const mediaRecorder = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [audioChunks, setAudioChunks] = useState([]);
  const [audio, setAudio] = useState(null);
  const [title, setTitle] = useState("Perekaman Wicara");
  const [showPopUp, setShowPopUp] = useState(false);

  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        setStream(streamData);
      } catch (err) {
        alert(err.message);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };

  const startRecording = async () => {
    setTitle("Perekaman sedang berlangsung");
    setRecordingStatus("recording");
    const media = new MediaRecorder(stream, { type: mimeType });
    mediaRecorder.current = media;
    mediaRecorder.current.start();
    let localAudioChunks = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
  };

  const stopRecording = () => {
    setTitle("Perekaman telah usai");
    setRecordingStatus("inactive");
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudio(audioUrl);
      setAudioChunks([]);
      console.log(audio);
    };
  };

  const metadata = {
    contentType: "audio/mpeg",
  };

  const uploadAudio = () => {
    if (audio === null) return console.log("audio null");
    const audioRef = ref(storage, `rekaman/${audio.name + uuidv4()}.mp3`);
    uploadBytes(audioRef, audio, metadata).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setAudioChunks((prev) => [...prev, url]);
      });
    });
    console.log("upload succeed");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full flex-1 text-center ">
      <div className="bg-blue-900 rounded-2xl flex flex-col justify-center items-center lg:w-2/3 w-full max-w-4xl mt-10">
        <div className="text-white p-5">
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          <div className="border-2 border-white w-28 inline-block mb-2"></div>
          <p className="mb-5 text-2xl font-medium">Petunjuk Perekaman:</p>
          {!permission ? (
            <p className="mb-5 text-xl flex">
              Untuk{" "}
              <span className="font-bold mx-1.5">mengaktifkan mikrofon,</span>{" "}
              pasien menekan tombol{" "}
              <span className="px-1.5 text-2xl text-blue-400">
                <BsMic />
              </span>{" "}
            </p>
          ) : (
            <div className="text-left">
              <p className="mb-5 text-xl">
                1. Pasien diharapkan menghitung satu sampai sepuluh
              </p>
              <p className="mb-5 text-lg font-small flex">
                2. Untuk <span className="font-bold mx-1.5">mulai</span>{" "}
                melakukan perekaman, pasien menekan tombol{" "}
                <span className="px-1.5 text-2xl text-red-600">
                  <BsFillPlayCircleFill />
                </span>{" "}
              </p>
              <p className="mb-5 text-lg font-small flex">
                3. Untuk <span className="font-bold mx-1.5">menyelesaikan</span>{" "}
                perekaman, pasien menekan tombol{" "}
                <span className="px-1.5 text-2xl text-red-600">
                  <BsFillStopCircleFill />
                </span>
              </p>
            </div>
          )}
          {audio ? (
            <p className="mb-5 text-lg font-small flex">
              4. Untuk <span className="font-bold mx-1.5">mengulang</span>{" "}
              perekaman, pasien menekan tombol{" "}
              <span className="px-1.5 text-2xl text-red-600">
                <BsFillPlayCircleFill />
              </span>{" "}
            </p>
          ) : null}
        </div>
        <main>
          <div className="audio-controls w-full flex justify-center p-2">
            {!permission ? (
              <button onClick={getMicrophonePermission} type="button">
                <BsMic size={48} className="text-blue-400" />
              </button>
            ) : null}
            {permission && recordingStatus === "inactive" ? (
              <div className="flex justify-between">
                <button onClick={startRecording} type="button" className="mx-8">
                  <BsFillPlayCircleFill size={48} className="text-red-600" />
                </button>
                <button onClick={stopRecording} type="button" className="mx-8">
                  <BsFillStopCircleFill size={48} />
                </button>
              </div>
            ) : null}

            {recordingStatus === "recording" ? (
              <div className="flex justify-between">
                <button onClick={startRecording} type="button" className="mx-8">
                  <BsFillPlayCircleFill size={48} />
                </button>
                <button onClick={stopRecording} type="button" className="mx-8">
                  <BsFillStopCircleFill size={48} className="text-red-600" />
                </button>
              </div>
            ) : null}
          </div>
          
          {audio && recordingStatus === 'inactive' ? (
            <div className="audio-container">
              {/* <audio src={audio} controls></audio> */}
              <div className=" p-2 w-full flex justify-center">
                <button onClick={() => setShowPopUp(true)} className="w-2/3 p-3  bg-neutral-500 rounded-3xl text-white font-bold">
                  Submit
                </button>

                {/* <Button
                  download
                  href={audio}
                  variant="outlined"
                  startIcon={<HiDownload />}
                  className="p-2"
                >
                  Download
                </Button>
                <Button
                  variant="contained"
                  endIcon={<HiUpload />}
                  className="p-2"
                  onClick={uploadAudio}
                >
                  Upload
                </Button> */}
                {/* <a download href={audio} className="text-white">
                Download Recording
              </a> */}
              </div>
            </div>
          ) : null}
        </main>
      </div>
      {showPopUp ? (
        <div
          className="absolute rounded-2xl flex flex-col justify-center items-center lg:w-full w-5/6 h-4/5 max-w-4xl mt-8"
          style={{ backgroundColor: "#F2D479" }}
        >
          <h2 className="text-3xl font-bold mb-2 text-neutral-500">
            Terima kasih
          </h2>
          <div className="border-2 border-neutral-500 w-28 inline-block mb-2"></div>
          <div className="p-2 lg:text-2xl text-lg text-center text-neutral-500">
            Rekaman suara anda telah kami simpan. Anda dapat melanjutkan ke proses
            berikutnya
          </div>
          <Link href="/AmbilData" className="mt-10 w-1/5">
            <button className="w-full p-3 bg-neutral-500 rounded-3xl text-white font-bold">
              Selesai
            </button>
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default AudioRecorder;
