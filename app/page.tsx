"use client"
import {
  Phone, Mail
} from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [joke, setJoke] = useState("");
  const [typedJoke, setTypedJoke] = useState("");

  const jokes = [
    "Why don’t skeletons fight each other? They don’t have the guts. 😂",
    "Why did the AI go to therapy? It couldn’t process its emotions. 🤖",
    "What’s a robot’s favorite type of music? Heavy metal! 🤘",
    "Why did the scarecrow win an award? He was outstanding in his field! 🌾",
  ];

  useEffect(() => {
    const random = jokes[Math.floor(Math.random() * jokes.length)];
    setJoke(random);
  }, []);

  useEffect(() => {
    let index = 0;
    setTypedJoke("");
    const interval = setInterval(() => {
      if (index < joke.length) {
        setTypedJoke((prev) => prev + joke.charAt(index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 30); // typing speed
    return () => clearInterval(interval);
  }, [joke]);

  const handleclick = () => {
    router.push("/sign-in");
  };

  return (
    <>
      <div className="fixed inset-0 -z-10 h-screen w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>

      <div className="relative min-h-screen">
        <div className="min-h-screen bg-healPurple">
          {/* header */}
          <header className="shadow-sm sticky top-0 z-50 bg-white rounded-lg">
            <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-7">
              <div className="flex justify-between items-center py-2 ">
                <div className="flex items-center space-x-1 mt-1">
                  <img src="logo.png" alt="Heal AI Logo" className="h-[50px] w-[50px]" />
                  <span className="text-2xl font-bold text-purple-500 hover:text-purple-700 transition-colors">Heal.ai</span>
                </div>

                {/* Get Started Button */}
                <div>
                  <button
                    onClick={handleclick}
                    className="text-sm px-4 py-1.5 md:text-base md:px-6 md:py-2 bg-purple-500 text-white rounded-full hover:bg-purple-700 transition-colors font-medium"
                  >
                    Let's find your mood!!
                  </button>
                </div>
              </div>
            </div>
          </header>

          <div className="flex flex-col items-center px-4 sm:px-6 py-6 space-y-6">
            {/* Joke Section */}
            <section className="w-full py-6 flex justify-center bg-gradient-to-b">
              <div className="w-full max-w-5xl px-4">
                <div className="bg-gradient-to-b from-purple-100 to-white text-black p-3 sm:p-5 md:p-6 rounded-lg text-center shadow-lg">
                  <p className="text-sm sm:text-base md:text-lg font-medium leading-snug sm:leading-relaxed break-words whitespace-pre-wrap">
                    {typedJoke}
                  </p>
                </div>
              </div>
            </section>

            {/* Image Section */}
            <section className="w-full max-w-5xl">
              <img
                src="smile.jpg"
                alt="Healing illustration"
                className="w-full max-h-[90vh] object-cover rounded-lg shadow-md"
              />
            </section>
          </div>

          {/* Footer */}
          <footer className="mt-16 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <div className="col-span-2">
                  <div className="flex items-center space-x-3 mb-4">
                    <h3 className="text-2xl font-bold text-purple-900">Heal.ai</h3>
                  </div>
                  <p className="text-gray-600 mb-6 max-w-md">
                    Empowering your wellness journey through cutting-edge AI technology and human expertise.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-4">Services</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li><a href="#" className="hover:text-gray-900 transition-colors">AI Therapy</a></li>
                    <li><a href="#" className="hover:text-gray-900 transition-colors">AI Doctor Consultation</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-4">Contact Us</h4>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>+1 (555) 123-4567</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span>hello@wellnessai.com</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Page;
