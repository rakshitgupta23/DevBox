import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const AboutUsPage = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="w-full max-w-6xl px-4 py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-black mb-4 text-center text-gray-800">
          About <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">DevBox IDE</span>
        </h1>
        <p className="text-xl text-center mb-12 text-gray-600 max-w-3xl mx-auto">
          We're a team of passionate developers building tools that make coding more accessible, collaborative, and enjoyable.
        </p>
      </div>

      {/* Our Story Section */}
      <div className="w-full bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* <div className="md:w-1/2">
              <div className="border-2 border-black rounded-md shadow-[8px_8px_0px_0px_rgba(0,0,0)] overflow-hidden">
                <Image
                  src="/team-photo.png"
                  alt="DevBox Team"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div> */}
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-lg mb-4 text-gray-700">
                DevBox IDE was born from a simple frustration: coding environments were either too complex to set up or too limited in functionality.
              </p>
              <p className="text-lg mb-4 text-gray-700">
              In 2023, we—two passionate developers—set out to build a powerful, user-friendly coding platform that runs seamlessly in your browser.
              </p>
              {/* <p className="text-lg text-gray-700">
                Today, DevBox IDE is used by thousands of developers, students, and coding enthusiasts worldwide, making programming more accessible than ever before.
              </p> */}
            </div>
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="w-full py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <ValueCard
              title="Accessibility"
              description="We believe coding should be accessible to everyone, regardless of their device or technical expertise."
              icon="🌍"
            />
            <ValueCard
              title="Innovation"
              description="We constantly push the boundaries of what's possible in browser-based development environments."
              icon="💡"
            />
            <ValueCard
              title="Community"
              description="We foster a supportive community where developers can learn, collaborate, and grow together."
              icon="🤝"
            />
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="w-full bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Meet the Team</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <TeamMemberCard
              name="Rakshit Gupta"
              role="Lead Developer"
              image="/Rakshit_Gupta.jpg"
            />
            <TeamMemberCard
              name="Pranav Raj Sharma"
              role="Co-Developer"
              image="/Pranav.jpg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Value Card Component
const ValueCard = ({ title, description, icon }) => {
  return (
    <div className="border-2 border-black rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] p-6 bg-white hover:shadow transition duration-200">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

// Team Member Card Component
const TeamMemberCard = ({ name, role, image }) => {
  return (
    <div className="border-2 border-black rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] p-4 bg-white hover:shadow transition duration-200 flex flex-col items-center">
      <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-black mb-4">
        <Image
          src={image}
          alt={name}
          width={128}
          height={128}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-lg font-bold text-center">{name}</h3>
      <p className="text-gray-600 text-center">{role}</p>
    </div>
  );
};

export default AboutUsPage;