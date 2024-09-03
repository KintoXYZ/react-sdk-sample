import * as React from "react";



export default function Projects() {
    const imageSrc = "/bglogo.png";
    const projectName = "My Project";
    const description = "This is my project description ansfjaebfqehjbfqiajd ";

    return (

        <main className="pb-10">
            <div className="pb-10 ">
                <h1 className="flex justify-center font-semibold text-3xl text-white">Projects</h1>
            </div>
            <div className="flex justify-center items-center pt-5">
                <div className="max-w-xs rounded-3xl overflow-hidden shadow-lg bg-black border-2 border-purple-950">
                    <img className="p-5 object-cover" src={imageSrc} alt={projectName}  />
                    <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2 text-white text-center">{projectName}</div>
                    <p className="text-gray-300 text-base text-center">
                        {description}
                    </p>
                    </div>
                </div>
            </div>
            
        </main>
        
    );
}; 