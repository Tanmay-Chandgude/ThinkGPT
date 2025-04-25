import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import Footer from "./Footer";
import ShareButtons from "./components/ShareButtons";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuestion(transcript);
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognition);
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  async function generateAnswer(e) {
    setGeneratingAnswer(true);
    e.preventDefault();
    setAnswer("Loading your answer... \n It might take up to 10 seconds");
    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${
          import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT
        }`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });

      setAnswer(
        response["data"]["candidates"][0]["content"]["parts"][0]["text"]
      );
    } catch (error) {
      console.log(error);
      setAnswer("Sorry, Something went wrong. Please try again!");
    }
    setGeneratingAnswer(false);
  } 

  return (
    <>
<div className="bg-gradient-to-r from-black via-gray-900 to-black min-h-screen p-6 flex flex-col justify-center items-center text-white">
  <div className="flex flex-col items-center overflow-y-auto w-full max-w-7xl px-4">
    <form
      onSubmit={generateAnswer}
      className="w-full sm:w-11/12 md:w-4/5 lg:w-3/5 xl:w-1/2 text-center rounded-2xl shadow-lg bg-black/60 backdrop-blur-lg py-12 px-10 transition-all duration-500 transform hover:scale-[1.02] border border-emerald-400/30"
    >
      <a
        href="https://github.com/Tanmay-Chandgude"
        target="_blank"
        rel="noopener noreferrer"
      >
        <h1 className="text-5xl font-extrabold text-emerald-400 mb-6 animate-pulse drop-shadow-lg">
          ThinkGPT
        </h1>
      </a>
      <div className="relative w-full">
        <textarea
          required
          className="border border-emerald-600 bg-gray-900 text-white rounded-xl w-full my-4 min-h-[180px] p-6 resize-none transition-all duration-300 focus:border-emerald-500 focus:shadow-xl focus:bg-gray-800 placeholder-gray-400 placeholder-opacity-80"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask your AI assistant..."
        ></textarea>
        {recognition && (
          <button
            type="button"
            onClick={toggleListening}
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-3 rounded-full shadow-md ${
              isListening ? "bg-red-500" : "bg-emerald-500"
            } hover:opacity-90 transition-all duration-300`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
          </button>
        )}
      </div>
      <button
        type="submit"
        className={`bg-emerald-600 text-white py-4 px-8 rounded-xl shadow-lg hover:bg-emerald-700 transition-all duration-300 ease-in-out ${
          generatingAnswer ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={generatingAnswer}
      >
        Generate Answer
      </button>
    </form>

    {/* Conditional Rendering for ReactMarkdown */}
    {answer && (
      <div className="w-full sm:w-11/12 md:w-4/5 lg:w-3/5 xl:w-1/2 text-center rounded-2xl bg-black/60 backdrop-blur-lg border border-emerald-400/30 my-6 shadow-2xl transition-all duration-500 transform hover:scale-[1.02]">
        <div className="p-8 text-left">
          <ReactMarkdown className="prose prose-invert prose-sm sm:prose-base">
            {answer}
          </ReactMarkdown>
          <div className="mt-4">
            <ShareButtons answer={answer} />
          </div>
        </div>
      </div>
    )}
    <Footer />
  </div>
</div>


    </>
  );
}

export default App;
