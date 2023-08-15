'use client'
import axios from "axios";
import { useState, useEffect } from "react"
const Prompt = () => {

    const [text, setText] = useState('');
    const [response, setResponse] = useState("");

    const handleTextChange = (e) => {
        setText(e.target.value);
      };

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log("111");
        const response = await axios.post("/api/openai", { messages: text });
        console.log("222");
        console.log(response.data);
        console.log(`The text is ${isTrue ? "true" : "false"}`);
      } catch (error) {
        console.log("333");
        console.error(error);
      }
    };
    return(
        <section className="prompt">
            <form className="relative w-full flex-center flex-col" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="What is your opinion?"
                    value={text}
                    onChange={handleTextChange}
                    className="search_input peer"
                />
                <button type="submit" className="outline_btn mt-6 justify-end">Submit</button>
            </form>
            {response && <p>{response}</p>}
        </section>
    )
}

export default Prompt;