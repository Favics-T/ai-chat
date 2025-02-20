import React, { useState } from 'react';
import { BsTranslate } from "react-icons/bs";
import { MdSummarize, MdArrowDropDownCircle } from "react-icons/md";

const Chat = () => {
    const [userInput, setUserInput] = useState('');
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);
    const [dropDown, setDropDown] = useState(false);
    const [detectedLanguage, setDetectedLanguage] = useState(null);

    const languages = ['English (en)', 'Portuguese (pt)', 'Spanish (es)', 'Russian (ru)', 'Turkish (tr)', 'French (fr)'];

    // Handle summarization
    const handleSummarize = async () => {
        if (!userInput.trim()) {
            alert("Please enter text to summarize.");
            return;
        }

        setLoading(true);
        try {
            const summarizer = await self.ai.summarizer.create();
            const summaryResult = await summarizer.summarize(userInput);
            setSummary(summaryResult);
        } catch (error) {
            console.error("Summarization failed:", error);
            setSummary("Failed to generate summary.");
        }
        setLoading(false);
    };

    // Handle language detection
    const detectLanguage = async () => {
        if (!userInput.trim()) {
            alert("Please enter text to detect language.");
            return;
        }
    
        try {
            console.log("⏳ Creating Language Detector...");
            const detector = await self.ai.languageDetector.create();
            console.log("✅ Detector created:", detector);
    
            console.log("🔍 Detecting language for text:", userInput);
            const result = await detector.detect(userInput);
            console.log("📌 Raw Detection Result:", result);
    
            if (result && result.length > 0 && result[0].detectedLanguage) {
                console.log("✅ Detected Language:", result[0].detectedLanguage);
                setDetectedLanguage(result[0].detectedLanguage);
            } else {
                console.warn("⚠️ No language detected.");
                setDetectedLanguage("Could not detect language.");
            }
        } catch (error) {
            console.error("❌ Language detection failed:", error);
            setDetectedLanguage("Detection failed.");
        }
    };
    
    
    

    return (
        <div className='bg-[#000b53] h-screen w-full flex flex-col md:flex-row items-center justify-center'>
            <div className='flex gap-10 text-blue-500'>

                {/* Input Field */}
                <div className='relative'>
                    <input 
                        type="text"
                        className='bg-white md:w-96 w-40 rounded-xl text-blue-800 p-2'
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Enter text here..."
                    />
                    <MdArrowDropDownCircle 
                        className='absolute right-4 top-2 cursor-pointer text-xl' 
                        onClick={() => setDropDown(!dropDown)}
                    />
                </div>

                {/* Detect Language Section */}
                <div className='text-center cursor-pointer' onClick={detectLanguage}>
                    <BsTranslate className="text-white text-2xl mx-auto"/>
                    <h1 className='text-white'>Detect Language</h1>
                </div>

                {/* Summarize Section */}
                <div className='text-center cursor-pointer' onClick={handleSummarize}>
                    <MdSummarize className="text-white text-2xl mx-auto"/>
                    <h1 className='text-white'>Summarize</h1>
                </div>
            </div>

            {/* Languages List (Dropdown) */}
            {dropDown && (
                <div className='bg-white p-2 rounded-lg mt-2 shadow-lg'>
                    {languages.map((language, index) => (
                        <p 
                            key={index} 
                            className="text-blue-800 hover:bg-gray-200 p-2 cursor-pointer"
                            onClick={() => {
                                setUserInput(language);
                                setDropDown(false);
                            }}
                        >
                            {language}
                        </p>
                    ))}
                </div>
            )}

            {/* Display Summary */}
            <div className="mt-6 bg-white p-4 rounded-lg w-3/4">
                <h2 className="text-blue-800 font-bold">Summary:</h2>
                {loading ? (
                    <p className="text-gray-500">Summarizing...</p>
                ) : (
                    <p className="text-gray-800">{summary || "No summary generated yet."}</p>
                )}
            </div>

            {/* Display Detected Language */}
            {detectedLanguage && (
                <div className="mt-4 bg-white p-4 rounded-lg w-3/4">
                    <h2 className="text-blue-800 font-bold">Detected Language:</h2>
                    <p className="text-gray-800">{detectedLanguage}</p>
                </div>
            )}
        </div>
    );
};

export default Chat;
