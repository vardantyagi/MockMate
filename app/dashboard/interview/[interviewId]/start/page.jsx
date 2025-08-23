'use client';

import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import Questions from './_components/Questions';
import RecordAnswer from './_components/RecordAnswer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const StartInterview = ({ params }) => {

  const [interviewData, setInterviewData] = useState([]);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);

  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);

  const { interviewId } = React.use(params);

  const getInterviewDetails = async () => {
    const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, interviewId));

    const raw = result[0].jsonMockResp;
    const endIndex = raw.lastIndexOf("]");
    const safeJson = raw.substring(0, endIndex + 1);

    const jsonMockResp = JSON.parse(safeJson);
    setMockInterviewQuestion(jsonMockResp);
    setInterviewData(result[0]);
  }
  useEffect(() => {
    getInterviewDetails();
  }, [])
  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Mock Interview Session</h2>
        <p className="text-gray-500 mt-1">Answer the questions. Navigate freely.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-xl shadow-md">
        <div className="border-r md:pr-6">

          {/* Questions */}
          <Questions
            activeQuestionIdx={activeQuestionIdx}
            mockInterviewQuestion={mockInterviewQuestion}
          />
        </div>

        {/* Video / Audio Recording */}
        <div className="md:pl-6">
          <RecordAnswer
            activeQuestionIdx={activeQuestionIdx}
            mockInterviewQuestion={mockInterviewQuestion}
            interviewData={interviewData}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mt-10 gap-4">
        <div className="flex gap-4">
          {activeQuestionIdx > 0 && (
            <Button onClick={() => setActiveQuestionIdx(activeQuestionIdx - 1)}>
              Prev
            </Button>
          )}
          {activeQuestionIdx < mockInterviewQuestion.length - 1 && (
            <Button onClick={() => setActiveQuestionIdx(activeQuestionIdx + 1)}>
              Next
            </Button>
          )}
        </div>

        <Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`}>
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            End Interview &rarr;
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default StartInterview
