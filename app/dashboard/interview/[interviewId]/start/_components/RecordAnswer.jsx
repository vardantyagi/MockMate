'use client';

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react';
import { userAgent } from 'next/server';
import { toast } from 'sonner';
import { generateInterviewQA } from '@/utils/GeminiAIModal';
import { UserAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { db } from '@/utils/db';

const RecordAnswer = ({ activeQuestionIdx, mockInterviewQuestion, interviewData }) => {

  const [userAnswer, setUserAnswer] = useState('');
  const [isLoading, setIsLoadding] = useState(false);

  const { user } = useUser();

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: true,
    timeout: 1000,
    interimResults: true,
  });

  const saveUserAnswer = async () => {
    if (isRecording) {
      setIsLoadding(true);
      stopSpeechToText();
      if (userAnswer?.length < 12) {
        setIsLoadding(false);
        toast.error('Error while saving your answer,Please record again.')
        return;
      }
      const feedbackPrompt = `Question:${mockInterviewQuestion?.[activeQuestionIdx]?.question}, User Answer: ${userAnswer}, Depends on question add user answer for given interview question, please give us rating for answer and feedback as area of improvement if any in just 3 to 5 lines to improve it in JSON format with rating field and feedback field`;

      const response = await generateInterviewQA(feedbackPrompt);
      let resultText = '';
      for await (const chunk of response) {
        resultText += chunk.text;
      }
      let refinedData = resultText.replace("```json", "").replace("```", "");
      const jsonFeedback = JSON.parse(refinedData);
      // store feedback data in database
      const resp = await db.insert(UserAnswer).values({
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestion?.[activeQuestionIdx]?.question,
        correctAns: mockInterviewQuestion?.[activeQuestionIdx]?.answer,
        userAns: userAnswer,
        feedback: jsonFeedback?.feedback,
        rating: jsonFeedback?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format('DD-MM-yyyy')
      })
      if (resp) {
        toast('User Answer recorded successfully');
        setUserAnswer('');
        setResults([]);
      }
      setUserAnswer('');
      setResults([]);
      setIsLoadding(false);
    }
    else {
      startSpeechToText();
    }
  }

  // const logAnswer = () => {
  //   console.log("userAnswer: ", userAnswer);
  // }

  useEffect(() => {
    if (results) {
      setUserAnswer(prevAns => prevAns + ' ' + results);
    }
  }, [results]);

  return (
    <div className='flex items-center justify-center flex-col'>
      <div className='flex flex-col justify-center items-center bg-[#3f4a5a] rounded-lg p-5 my-5'>
        <Image src="/webcam.png" width={200} height={200} alt="Webcam Icon" className='absolute' />
        <Webcam mirrored={true} style={{ height: 300, width: '100%', zIndex: 10 }} />
      </div>
      <Button disabled={isLoading} onClick={saveUserAnswer} className={'mb-5'} variant={'outline'}>{isRecording ? <h2 className='flex gap-2'>
        <Mic /> 'Recording...'
      </h2> :
        'Record Answer'}
      </Button>
      {/* <Button onClick={logAnswer}>Show UserAnswer</Button> */}
    </div>
  )
}

export default RecordAnswer