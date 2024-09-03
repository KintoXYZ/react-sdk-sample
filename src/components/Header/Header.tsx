
import React from 'react';


export default function Header() {
    return (
        <div className=" mx-10 py-10 flex justify-between">
            <p className="text-white border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 font-semibold">
                CollabX
            </p>
                <a href="" className="text-white">
                    <p className="py-3 px-7 bg-black text-white border-4 rounded-full hover:bg-purple-950 border-purple-950">
                        Login
                    </p>
                </a>
        </div>
    );
}