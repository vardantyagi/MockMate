"use client";

import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { use, useEffect, useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const Feedback = ({ params }) => {

  const [feedbackList, setFeedbackList] = useState([]);
  const [overallRating, setOverallRating] = useState(0);

  const router = useRouter();

  const { interviewId } = use(params);

  const getFeedback = async () => {
    const result = await db.select().from(UserAnswer).where(eq(UserAnswer.mockIdRef, interviewId)).orderBy(UserAnswer.id);
    setFeedbackList(result);
  }

  // algo to get the rating in fraction like 3/5
  function simplifyFraction(numerator, denominator) {
    function gcd(a, b) {
      return b === 0 ? a : gcd(b, a % b); // Euclidean Algorithm
    }

    const divisor = gcd(numerator, denominator);
    const simplifiedNumerator = numerator / divisor;
    const simplifiedDenominator = denominator / divisor;

    return `${simplifiedNumerator}/${simplifiedDenominator}`;
  }
  const getOverallRating = () => {
    let rating = 0;
    feedbackList.map((feedback) => {
      rating += parseInt(feedback?.rating.slice(0, 1));
    })

    // algo to get the rating in fraction like 3/5
    let res = simplifyFraction(rating, feedbackList?.length * 5);
    setOverallRating(res);
  }

  useEffect(() => {
    getFeedback();
  }, []);
  useEffect(() => {
    if (feedbackList.length > 0) {
      getOverallRating();
    }
  }, [feedbackList]);
  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      {feedbackList.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-lg text-gray-500">No Interview Feedback Record Found</h2>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <h2 className="text-3xl font-extrabold text-green-600 mb-2">🎉 Congratulations!</h2>
            <h2 className="text-2xl font-bold text-gray-800">Here's your interview feedback</h2>
            <p className="text-primary text-lg mt-4">
              Overall Interview Rating: <strong className="text-black">{overallRating}</strong>
            </p>
            <p className="text-sm text-gray-500">
              Below you'll find each question, your response, and guidance for improvement.
            </p>
          </div>

          <div className="space-y-4">
            {feedbackList.map((item, i) => (
              <Collapsible key={i} className="border rounded-xl shadow-sm bg-gray-50">
                <CollapsibleTrigger className="w-full text-left px-4 py-3 flex justify-between items-center font-medium text-gray-800 hover:bg-gray-100 rounded-t-xl transition">
                  {item?.question}
                  <ChevronsUpDown className="h-4 w-5 text-gray-500" />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 py-4 space-y-3 border-t bg-white rounded-b-xl">
                  <div className="text-sm space-y-3">
                    <div className="p-3 bg-red-100 border rounded-md">
                      <strong className="text-red-600">Rating:</strong> {item.rating}
                    </div>
                    <div className="p-3 bg-yellow-50 border rounded-md">
                      <strong>Your Answer:</strong> {item.userAns}
                    </div>
                    <div className="p-3 bg-green-50 border rounded-md">
                      <strong>Correct Answer:</strong> {item.correctAns}
                    </div>
                    <div className="p-3 bg-blue-50 border rounded-md">
                      <strong>Feedback:</strong> {item.feedback}
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </>
      )}

      <div className="mt-8 text-center">
        <Button onClick={() => router.replace('/dashboard')}>Go to Dashboard</Button>
      </div>
    </div>
  )
}

export default Feedback