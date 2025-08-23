import { Lightbulb, Volume2 } from 'lucide-react';
import React from 'react'

const Questions = ({activeQuestionIdx, mockInterviewQuestion}) => {

  const textToSpeech = (text)=>{
    if('speechSynthesis' in window){
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    }
    else{
      alert('Sorry, Your browser does not support text to speech');
    }
  }
  
  return (
    mockInterviewQuestion &&
    activeQuestionIdx >= 0 && (
      <div className="p-6 bg-white shadow-md rounded-2xl border border-gray-200">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
          {mockInterviewQuestion.map((_, i) => (
            <div
              key={i}
              className={`text-center py-2 px-4 rounded-full text-sm font-medium cursor-pointer transition-all duration-200 ${
                activeQuestionIdx === i
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Question #{i + 1}
            </div>
          ))}
        </div>

        <div className="mt-6">
          <div className="flex items-start justify-between">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800 max-w-[90%]">
              {mockInterviewQuestion?.[activeQuestionIdx]?.question}
            </h2>

            <button
              onClick={() =>
                textToSpeech(mockInterviewQuestion?.[activeQuestionIdx]?.question)
              }
              className="ml-2 p-2 rounded-full hover:bg-gray-200 transition"
              aria-label="Play Question Audio"
            >
              <Volume2 className="text-gray-600" />
            </button>
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center text-blue-700 font-medium mb-1">
              <Lightbulb className="mr-2" />
              <span>Note:</span>
            </div>
            <p className="text-sm text-blue-700">{process.env.NEXT_PUBLIC_QUESTION_NOTE}</p>
          </div>
        </div>
      </div>
    )
  );
  
}

export default Questions
