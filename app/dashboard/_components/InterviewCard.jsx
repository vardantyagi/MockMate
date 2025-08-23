import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

const InterviewCard = ({interview} )=> {
  const router = useRouter();
  const onSubmit = ()=>{
    router.push(`/dashboard/interview/${interview?.mockId}`)
  }
  const getFeedback = ()=>{
    router.push(`/dashboard/interview/${interview?.mockId}/feedback`)
  }
  return (
    <div className='border shadow-sm rounded-lg p-3'>
      <h2 className='font-bold text-primary'>{interview?.jobPosition}</h2>
      <h2 className='text-sm text-gray-500'>{interview?.jobExperience==0?'Fresher':<>Exp: {interview?.jobExperience} Yrs</>}</h2>
      <h2>CreatedAt: {interview.createdAt}</h2>
      <div className='flex gap-5 mt-2'>
        <Button onClick={getFeedback} size={'sm'} variant={'outline'}>Feedback</Button>
        <Button onClick={onSubmit} size={'sm'}>Start</Button>
      </div>
    </div>
  )
}

export default InterviewCard