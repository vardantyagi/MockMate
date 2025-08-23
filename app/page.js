'use client';

import { Pencil, Share2, Wand2 } from 'lucide-react';
import Link from 'next/link';

const steps = [
  {
    title: 'Write prompt for your form',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut quo possimus adipisci distinctio alias.',
    icon: <Wand2 className="w-8 h-8 mb-4" />,
  },
  {
    title: 'Edit Your form',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut quo possimus adipisci distinctio alias.',
    icon: <Pencil className="w-8 h-8 mb-4" />,
  },
  {
    title: 'Share & Start Accepting Responses',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut quo possimus adipisci distinctio alias.',
    icon: <Share2 className="w-8 h-8 mb-4" />,
  },
];

export default function Home() {
  return (
    <div>
      <h2 className='font-extrabold text-4xl text-center pt-6'><span className='text-orange-600'>MockMate</span> – Ace Every Interview.</h2>
      <h2 className='p-6 text-center font-semibold'>Your AI-powered interview buddy—practice real questions, get instant feedback, and boost confidence before the big day.</h2>

      <div className='flex items-center w-full'>
        <Link className='mx-auto' href={'/dashboard'} ><button className="mt-10 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-full transition">
        Get Started &rarr;
      </button></Link>
      </div>

      <section className="relative py-20 px-6 md:px-20 bg-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none"></div>

        <div className="relative z-10 text-center">
          <h2 className="text-3xl font-bold">How it Works?</h2>
          <p className="text-gray-500 mt-2 mb-10">
            Give mock interview in just 3 sim[pl]ar easy step
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow p-6 hover:shadow-xl transition"
              >
                {step.icon}
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm">{step.description}</p>
              </div>
            ))}
          </div>

          <Link href={'/dashboard'} ><button className="mt-10 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-full transition">
            Get Started Today
          </button></Link>
        </div>
      </section>
    </div>
  );
}
