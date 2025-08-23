"use client"

import { UserButton } from '@clerk/nextjs'
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react'

export default () => {

    const [state, setState] = useState(false);

    const navigation = [
        { title: "Dashboard", path: "/dashboard", id:0 },
        { title: "Questions", path: "/", id:1 },
        { title: "Upgrade", path: "/dashboard", id:2 },
        { title: "How it works?", path: "/", id:3 }
    ]

    useEffect(() => {
        document.onclick = (e) => {
            const target = e.target;
            if (!target.closest(".menu-btn")) setState(false);
        };
    }, [])

    return (
        <nav className={`bg-white pb-5 md:text-sm ${state ? "shadow-lg rounded-xl border mx-2 mt-2 md:shadow-none md:border-none md:mx-2 md:mt-0" : ""}`}>
            <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
                <div className="flex items-center justify-between py-5 md:block">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <Image src="/MockMateLogo.svg" width={180} height={80} alt="MockMate" />
                    </Link>
                    <div className="md:hidden">
                        <button className="menu-btn text-gray-500 hover:text-gray-800"
                            onClick={() => setState(!state)}
                        >
                            <Image
                                src="/burger-menu.svg"
                                alt="menu"
                                width={24}
                                height={24}
                                className="transition-transform duration-200"
                            />
                        </button>
                    </div>
                </div>
                <div className={`flex-1 items-center mt-8 md:mt-0 md:flex ${state ? 'block' : 'hidden'} `}>
                    <ul className="justify-center items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
                        {
                            navigation.map((item, idx) => {
                                return (
                                    <li key={idx} className="text-gray-700 hover:text-gray-900">
                                        <a href={item.path} className={`block px-2 py-1 rounded-md transition-colors duration-200 text-gray-700 hover:text-blue-500`}>
                                            {item.title}
                                        </a>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <div className="flex-1 gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0">
                        <UserButton />
                    </div>
                </div>
            </div>
        </nav>
    )
}
