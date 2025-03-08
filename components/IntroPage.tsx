import React from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

const IntroPage = () => {
    const router = useRouter();
    const { status } = useSession();

    const navigateToEditor = () => {
        router.push('/editor');
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            {/* Hero Section */}
            <div className="w-full max-w-6xl px-4 py-16 md:py-24 flex flex-col md:flex-row items-center justify-between">
                <div className="md:w-1/2 mb-10 md:mb-0">
                    <h1 className="text-4xl md:text-5xl font-black mb-4 text-gray-800">
                        DevBox <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">IDE</span>
                    </h1>
                    <p className="text-xl mb-6 text-gray-600">
                        A powerful web-based code editor supporting 30+ programming languages with real-time execution
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <button
                            onClick={navigateToEditor}
                            className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-black border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-6 py-3 hover:shadow transition duration-200 text-lg"
                        >
                            Start Coding
                        </button>
                        {status !== "authenticated" && (
                            <Link href="/auth/signup">
                                <button className="font-black border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-6 py-3 hover:shadow transition duration-200 bg-white text-lg">
                                    Sign In
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
                <div className="md:w-1/2">
                    <div className="border-2 border-black rounded-md shadow-[8px_8px_0px_0px_rgba(0,0,0)] overflow-hidden">
                        <Image
                            src="/editor-preview.png"
                            alt="DevBox IDE Preview"
                            width={1000}
                            height={600}
                            className="w-full h-auto"
                            priority
                        />
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="w-full bg-white py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            title="30+ Languages"
                            description="Code in Python, JavaScript, Java, C++, Ruby, Go and many more programming languages."
                            icon="🌐"
                        />
                        <FeatureCard
                            title="Real-time Execution"
                            description="Compile and run your code directly in the browser with instant feedback."
                            icon="⚡"
                        />
                        <FeatureCard
                            title="Save Your Work"
                            description="Create an account to save your code snippets and access them anytime."
                            icon="💾"
                        />
                        <FeatureCard
                            title="Cloud Storage"
                            description="Your code is backed up to the cloud, ensuring you never lose your work."
                            icon="☁️"
                        />
                        <FeatureCard
                            title="Custom Themes"
                            description="Choose from a variety of editor themes to match your preference."
                            icon="🎨"
                        />
                        <FeatureCard
                            title="Mobile Friendly"
                            description="Code on the go with our responsive design that works on all devices."
                            icon="📱"
                        />
                    </div>
                </div>
            </div>

            {/* Getting Started Section */}
            <div className="w-full py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-8">Getting Started</h2>
                    <div className="border-2 border-black rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] p-6 bg-white">
                        <ol className="list-decimal pl-6 space-y-4">
                            <li className="text-lg">
                                <span className="font-bold">Choose a language</span> - Select from our wide range of supported programming languages
                            </li>
                            <li className="text-lg">
                                <span className="font-bold">Write your code</span> - Use our feature-rich editor with syntax highlighting
                            </li>
                            <li className="text-lg">
                                <span className="font-bold">Run your code</span> - Compile and execute with a single click to see immediate results
                            </li>
                            <li className="text-lg">
                                <span className="font-bold">Save your work</span> - Create an account to save your code snippets for future use
                            </li>
                        </ol>
                        <div className="mt-8 text-center">
                            <button
                                onClick={navigateToEditor}
                                className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-black border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-6 py-3 hover:shadow transition duration-200 text-lg"
                            >
                                Start Coding Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Feature Card Component
const FeatureCard = ({ title, description, icon }) => {
    return (
        <div className="border-2 border-black rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] p-6 bg-white hover:shadow transition duration-200">
            <div className="text-4xl mb-4">{icon}</div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
};

export default IntroPage;