import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return <div className='flex flex-col justify-center items-center min-h-[100vh] gap-6'>
    <h1 className='font-bold text-4xl'>Welcome back to MockMate</h1>
    <SignIn />
  </div>
}