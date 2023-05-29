import React, { useState } from "react";
import {
  BsFillPlayCircleFill,
  BsFillStopCircleFill,
  BsMicFill,
} from "react-icons/bs";

const SurveyStudent = () => {
  const [active, setActive] = useState()
  
  return (
    <div className="flex flex-col items-center justify-center w-full flex-1 text-center">
      <div className="bg-green-400 rounded-2xl flex flex-col justify-center items-center lg:w-2/3 w-full max-w-4xl mt-10">
        <div className="text-white p-5">
          <h2 className="text-3xl font-bold mb-2">Kuesioner</h2>
          <div className="border-2 border-white w-28 inline-block mb-2"></div>
          <p className="mb-5 text-lg font-medium">Petunjuk Kuesioner:</p>
          <div className="text-left font-bold text-2xl">
            <p className="mb-5 text-lg font-small">
              1. Kuesioner terdiri atas 8 pertanyaan
            </p>
            <p className="mb-5 text-lg font-small flex">
              2. Setiap pertanyaan terdiri atas 6 pilihan skor 0-5
            </p>
            <p className="mb-5 text-lg font-small flex">
              3. Pasien dapat memilih skor sesuai dengan kondisi tubuh yang
              dirasakan
            </p>
          </div>
          <a
            href="/registrasi"
            className="border-2 text-green-400 bg-white font-semibold rounded-full px-10 py-2 inline-block"
          >
            Mulai
          </a>
        </div>
      </div>
    </div>
  );
};

export default SurveyStudent;
