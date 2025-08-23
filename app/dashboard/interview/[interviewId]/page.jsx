'use client'
import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam';

const Interview = ({ params }) => {

  const [interviewData, setInterviewData] = useState(null);
  const [isWebcamEnabled, setIsWebcamEnabled] = useState(false);

  const { interviewId } = React.use(params);

  const getInterviewDetails = async () => {
    const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, interviewId));
    setInterviewData(result[0]);
  }
  useEffect(() => {
    getInterviewDetails();
  }, [])
  return (
    <div className='max-w-6xl mx-auto px-4 py-10'>
      <h2 className='text-3xl font-bold mb-2'>🎤 Let's Get Started</h2>
      <p className="text-gray-500 mb-8">Review your job info and enable camera to begin your mock interview.</p>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        {/* Left Side */}
        <div className='flex flex-col gap-6'>
          <div className='p-6 bg-white rounded-xl border shadow-sm space-y-3'>
            <h3 className='text-lg font-semibold'><strong>Job Role:</strong> {interviewData?.jobPosition}</h3>
            <h3 className='text-lg'><strong>Tech Stack:</strong> {interviewData?.jobDesc}</h3>
            <h3 className='text-lg'><strong>Experience:</strong> {interviewData?.jobExperience === '0' ? 'Fresher' : interviewData?.jobExperience + ' years'}</h3>
          </div>

          <div className='p-5 border border-yellow-300 bg-yellow-100 rounded-xl'>
            <h2 className='flex items-center gap-2 text-yellow-600 font-semibold'>
              <Lightbulb className='w-5 h-5' />
              Important Information
            </h2>
            <p className='mt-3 text-yellow-700 text-sm'>{process.env.NEXT_PUBLIC_INFORMATION}</p>
          </div>
        </div>

        {/* Right Side */}
        <div className='flex flex-col items-center justify-center gap-4 p-6 border rounded-xl bg-white shadow-sm'>
          {isWebcamEnabled ? (
            <Webcam
              height={300}
              width={300}
              className='rounded-xl border'
              onUserMedia={() => setIsWebcamEnabled(true)}
              onUserMediaError={() => setIsWebcamEnabled(false)}
              mirrored={true}
            />
          ) : (
            <>
              <div className='w-full h-[300px] flex items-center justify-center bg-gray-100 rounded-xl'>
                <WebcamIcon className='h-16 w-16 text-gray-400' />
              </div>
              <Button variant='outline' onClick={() => setIsWebcamEnabled(true)} className='w-full'>
                Enable Webcam & Microphone
              </Button>
            </>
          )}
        </div>
      </div>

      <div className='flex justify-end mt-8'>
        <Link href={`/dashboard/interview/${interviewId}/start`}>
          <Button className='text-base px-6 py-2'>Start Interview</Button>
        </Link>
      </div>
    </div>
  )
}

export default Interview
