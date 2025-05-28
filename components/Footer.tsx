import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

function Footer() {
    const router = useRouter();

    const handleNavigation = (path) => {
        router.push(path);
    };

    return (
        <div className="w-full p-6 py-8 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
                {/* Logo */}
                <div className="mb-4 md:mb-0">
                    <p className="text-white font-extrabold text-2xl">DevBox</p>
                </div>

                {/* Navigation */}
                <div className="flex flex-wrap justify-center gap-4 mb-4 md:mb-0">
                    <button
                        onClick={() => handleNavigation("/")}
                        className="text-white hover:underline"
                    >
                        Home
                    </button>
                    <button
                        onClick={() => handleNavigation("/editor")}
                        className="text-white hover:underline"
                    >
                        Editor
                    </button>
                    <button
                        onClick={() => handleNavigation("/about")}
                        className="text-white hover:underline"
                    >
                        About Us
                    </button>
                </div>

                {/* Social Icons (placeholder) */}
                <div className="flex gap-4 mb-4 md:mb-0">
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-80">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-github">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-80">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-linkedin">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                            <rect x="2" y="9" width="4" height="12"></rect>
                            <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                    </a>
                </div>
            </div>
            {/* Copyright and contact information */}
            <div className="mt-6 text-center text-white">
                <p className="font-medium">© 2025 DevBox. All Rights Reserved.</p>
                <p className="mt-1">Email: <a href="mailto:rakshitgupta232003@gmail.com" className="hover:underline">rakshitgupta232003@gmail.com</a></p>
            </div>
        </div>
    );
}

export default Footer;

