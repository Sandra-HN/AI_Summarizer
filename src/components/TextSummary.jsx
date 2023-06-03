import React, { useState, useEffect } from "react";

import { copy, linkIcon, loader, tick } from "../assets";
import { useGetTextSummaryMutation } from "../services/summarizer";

const TextSummary = () => {
  const [prompt, setPrompt] = useState({
    text: "",
    summary: "",
  });
  const [allPrompts, setAllPrompts] = useState([]);
  const [copied, setCopied] = useState("");

  // RTK lazy query
  const [getTextSummary, { error, isFetching }] = useGetTextSummaryMutation();

  // Load data from localStorage on mount
  useEffect(() => {
    const promptsFromLocalStorage = JSON.parse(
      localStorage.getItem("prompts")
    );

    if (promptsFromLocalStorage) {
      setAllPrompts(promptsFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const existingPrompt = allPrompts.find(
      (item) => item.text === prompt.text
    );

    if (existingPrompt) return setPrompt(existingPrompt);

    const { data } = await getTextSummary({ prompt: prompt.text });
    
    if(data.data.length>0){
      const newPrompt = { ...prompt,  summary: data.data[0].text };
      const updatedAllPrompts = [newPrompt, ...allPrompts];
  // update state and local storage
      setPrompt(newPrompt);
      setAllPrompts(updatedAllPrompts);
      localStorage.setItem("prompts", JSON.stringify(updatedAllPrompts));
    }
   
  };

  // copy the url and toggle the icon for user feedback
  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  };

  return (
    <section className='mt-16 w-full max-w-xl'>
      {/* Search */}
      <div className='flex flex-col w-full gap-2'>
        <form
          className='relative flex justify-center items-center'
          onSubmit={handleSubmit}
        >
         

          <textarea
          rows={5}
            placeholder='Paste the text'
            value={prompt.text}
            onChange={(e) => setPrompt({ ...prompt, text: e.target.value })}
            onKeyDown={handleKeyDown}
            required
            className='text_input peer' // When you need to style an element based on the state of a sibling element, mark the sibling with the peer class, and use peer-* modifiers to style the target element
          />
          <button
            type='submit'
            className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700 '
          >
            <p>↵</p>
          </button>
        </form>

        {/* Browse History */}
        <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
          {allPrompts.reverse().map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setPrompt(item)}
              className='link_card'
            >
              <div className='copy_btn' onClick={() => handleCopy(item.text)}>
                <img
                  src={copied === item.text ? tick : copy}
                  alt={copied === item.text ? "tick_icon" : "copy_icon"}
                  className='w-[40%] h-[40%] object-contain'
                />
              </div>
              <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Display Result */}
      <div className='my-10 max-w-full flex justify-center items-center'>
        {isFetching ? (
          <img src={loader} alt='loader' className='w-20 h-20 object-contain' />
        ) : error ? (
          <p className='font-inter font-bold text-black text-center'>
            Well, that wasn't supposed to happen...
            <br />
            <span className='font-satoshi font-normal text-gray-700'>
              {error?.data?.error}
            </span>
          </p>
        ) : (
          prompt.summary && (
            <div className='flex flex-col gap-3'>
              <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                <span className='blue_gradient'>Summary</span>
              </h2>
              <div className='summary_box'>
                <p className='font-inter font-medium text-sm text-gray-700'>
                  {prompt.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default TextSummary;
