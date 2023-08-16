'use client'
import axios from "axios";
import { useState } from "react";
import { FaSmile, FaSadTear } from "react-icons/fa";
import { RIGHT_RESPONSE, WRONG_RESPONSE, INVALID_RESPONSE } from "../constant/response";

const Prompt = () => {
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/openai", { messages: text });
      setResponse(response.data);
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
        <button type="submit" className={`mt-6 bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-full ${!text ? 'opacity-50 cursor-not-allowed' : ''}`}>
          Button
        </button>
      </form>
      {response && (
        <div className="mt-4">
          {response === RIGHT_RESPONSE && (
            <>
              <p className="text-green-500">
                {response}
                <FaSmile className="inline-block ml-2" size={24} />
              </p>
            </>
          )}
          {response === WRONG_RESPONSE && (
            <>
              <p className="text-red-500">
                {response}
                <FaSadTear className="inline-block ml-2" size={24} />
              </p>
            </>
          )}
          {response === INVALID_RESPONSE && (
            <p className="text-yellow-500">{response}</p>
          )}
        </div>
      )}
    </section>
  );
};

export default Prompt;