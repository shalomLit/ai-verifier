'use client'
import axios from "axios";
import { useState } from "react";
import { FaSmile, FaSadTear, FaSpinner } from "react-icons/fa";
import { RIGHT_RESPONSE, WRONG_RESPONSE, INVALID_RESPONSE } from "@constants/responseTypes";

const Prompt = () => {
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post("/api/openai", { messages: text });
      setResponse(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="prompt">
      <form
        className="relative w-full flex-center flex-col"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="What is your opinion?"
          value={text}
          onChange={handleTextChange}
          className="search_input peer"
        />
        <button
        type="submit"
        className={`mt-6 bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-full ${!text || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={!text || isLoading}
        style={{ display: "flex", alignItems: "center" }}
        >
        {isLoading && (
            <FaSpinner className="animate-spin h-5 w-5 mr-2" />
        )}
        Button
        </button>
      </form>
      {response && (
        <div className="mt-4 rounded-lg shadow-lg border border-gray-100 p-4">
          {response === RIGHT_RESPONSE.text && (
            <>
              <p className={RIGHT_RESPONSE.style}>
                {response}
                <FaSmile className="inline-block ml-2" size={24} />
              </p>
            </>
          )}
          {response === WRONG_RESPONSE.text && (
            <>
              <p className={WRONG_RESPONSE.style}>
                {response}
                <FaSadTear className="inline-block ml-2" size={24} />
              </p>
            </>
          )}
          {response === INVALID_RESPONSE.text && (
            <p className={INVALID_RESPONSE.style}>{response}</p>
          )}
        </div>
      )}
    </section>
  );
};

export default Prompt;