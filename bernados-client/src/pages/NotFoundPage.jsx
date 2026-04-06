import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F6F0D7] px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                
                <div className="flex justify-center mb-12">
                    <div className="rounded-full border-[10px] border-[#BDD29F] p-8 bg-[#90A87F]/10 shadow-lg">
                        <span className="text-[120px] font-extrabold leading-none tracking-tighter text-[#80956B]">
                            404
                        </span>
                    </div>
                </div>

                <h1 className="text-4xl font-bold tracking-tight text-[#80956B] sm:text-6xl mb-6">
                    Invalid URL
                </h1>
                <p className="mt-6 text-xl leading-8 text-[#90A87F] max-w-xl mx-auto mb-10">
                    The link you followed might be broken, or the page may have been moved. Let's get you back on track.
                </p>

                <div className="flex items-center justify-center gap-x-6">
                    <Link
                        to="/"
          
                        className="rounded-full bg-[#80956B] px-10 py-3.5 text-lg font-semibold text-[#F6F0D7] shadow-md hover:bg-[#90A87F] transition-colors duration-200"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NotFoundPage;