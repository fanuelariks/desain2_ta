import React from "react";
import statement from "../data/question.json";
import { useState } from "react";
import useGetValue from "../hook/getValue";
import { getDatabase, push, ref, set } from "firebase/database";
import { useForm } from "react-hook-form";
import FormError from "../components/Error";
import Link from "next/link";

const Statement = () => {
  const survey = useGetValue("survey");
  const data = Object.values(survey.snapshot || {});
  const db = getDatabase();
  // console.log(data)
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // const [buttonText, setButtonText] = useState('Selanjutnya')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const validate = () => {
    return selectedOptions.length < data.length;
  };

  const handlePrev = () => {
    setCurrentQuestion(currentQuestion - 1);
  };
  const handleNext = () => {
    if (currentQuestion === data.length - 1) {
      // setButtonText('Submit')
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
    // const nextQues = currentQuestion + 1;
    // nextQues < data.length && setCurrentQuestion(nextQues);
  };

  const buttonText =
    currentQuestion === data.length - 1 ? "Submit" : "Selanjutnya";

  const handleAnswerOptions = (answer) => {
    setSelectedOptions([
      (selectedOptions[currentQuestion] = { answerByUser: answer }),
    ]);
    setSelectedOptions([...selectedOptions]);
    console.log(selectedOptions);
  };

  const submitAnswer = () => {
    // setIsLoading(true);
    // try {
    //   selectedOptions.id = push(ref(db, "answer/")).key;
    //   const reference = ref(db, `answer/${selectedOptions.id}`);
    //   set(reference, selectedOptions);
    // } catch (error) {
    //   // const message = FormError(error.type)
    //   // console.log(message);
    // }
  };

  return (
    <form
      onSubmit={handleSubmit(submitAnswer)}
      className="flex items-center justify-center content-center justify-items-center w-full flex-1 text-center"
    >
      <div className="flex flex-col justify-center items-center w-full">
        <div
          className="relative rounded-2xl flex flex-col justify-center items-center lg:w-2/3 w-5/6 h-max max-w-4xl mt-32"
          style={{ backgroundColor: "#7787A6" }}
        >
          <div className="text-white p-2 w-full">
            <h2 className="text-3xl font-bold mb-2">
              COPD Assessment Test
            </h2>
            <div className="border-2 border-white w-28 inline-block mb-2"></div>
            <h3 className="text-2xl font-semibold mb-2">
              Pernyataan {currentQuestion + 1} dari {data.length}
            </h3>
            <div className="flex flex-row w-full">
              <div className="p-2 lg:text-2xl text-lg text-left">
                {data[currentQuestion]?.statement1}
              </div>
              <div className="p-1 flex flex-row w-full mx-10">
                {data[currentQuestion]?.answerOptions.map((answer, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-1 h-1/3 my-10 mx-2 space-x-5 font-extrabold cursor-pointer text-xl"
                    onClick={(e) => handleAnswerOptions(answer.answer)}
                    checked={
                      answer.answer ===
                      selectedOptions[currentQuestion]?.answerByUser
                    }
                  >
                    <input
                      type="radio"
                      name="answer"
                      value={selectedOptions}
                      onChange={(e) => handleAnswerOptions(answer.answer)}
                      checked={
                        answer.answer ===
                        selectedOptions[currentQuestion]?.answerByUser
                      }
                      className="w-6 h-6 bg-black rounded-xl"
                      // {...register("answer", { required: true })}
                    />
                    <p className="ml-6 text-bold">{answer.answer}</p>
                  </div>
                ))}
              </div>
              <div className="p-2 lg:text-2xl text-lg text-left">
                {data[currentQuestion]?.statement2}
              </div>
            </div>
          </div>
        </div>
        <div className="relative flex justify-between lg:w-3/6 w-4/5 mt-10 text-white font-bold">
          {currentQuestion !== 0 && (
            <button
              onClick={handlePrev}
              disabled={currentQuestion === 0}
              className="w-1/5 py-3 bg-indigo-900 rounded-3xl"
            >
              Sebelumnya
            </button>
          )}

          <button
            onClick={
              currentQuestion === data.length - 1
                ? () => setShowPopUp(true)
                : handleNext
            }
            className={
              currentQuestion === 0
                ? "mx-80 w-2/5 py-3 bg-indigo-900 rounded-3xl"
                : "w-1/5 py-3 bg-indigo-900 rounded-3xl"
            }
          >
            {buttonText}
          </button>
        </div>
      </div>
      {showPopUp ? (
        <div
          className="absolute rounded-2xl flex flex-col justify-center items-center lg:w-full w-5/6 h-2/3 max-w-4xl mt-32"
          style={{ backgroundColor: "#F2D479" }}
        >
          <h2 className="text-3xl font-bold mb-2 text-neutral-500">
            Terima kasih
          </h2>
          <div className="border-2 border-neutral-500 w-28 inline-block mb-2"></div>
          <div className="p-2 lg:text-2xl text-lg text-left text-neutral-500">
            Kuesioner anda telah kami simpan. Anda dapat melanjutkan ke proses
            berikutnya
          </div>
          <Link href="/AmbilData" className="mt-10 w-1/5">
            <button className="w-full p-3 bg-neutral-500 rounded-3xl text-white font-bold">
              Selesai
            </button>
          </Link>
        </div>
      ) : null}
    </form>
  );
};

export default Statement;
