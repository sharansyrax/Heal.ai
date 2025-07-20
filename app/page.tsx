"use client"
import { Heart, MessageCircle, Stethoscope, Phone, Mail, MapPin, Star, ArrowRight, Sparkles, Brain, Shield, Clock, Menu, X, User } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";


const Page =  () => {
   const [isVisible, setIsVisible] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
const jokes = [
  "Why don’t skeletons fight each other? They don’t have the guts. 😂",
  "Why did the AI go to therapy? It couldn’t process its emotions. 🤖",
  "What’s a robot’s favorite type of music? Heavy metal! 🤘",
  "Why did the scarecrow win an award? He was outstanding in his field! 🌾",
];

const [joke, setJoke] = useState("");

useEffect(() => {
  const random = jokes[Math.floor(Math.random() * jokes.length)];
  setJoke(random);
}, []);


 const router = useRouter()
    const handleclick = () => {
    router.push("/sign-in");
  };
    return (
      <>
       <div className="fixed inset-0 -z-10 h-screen w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>

       <div className="relative min-h-screen">
        <div className="min-h-screen bg-healPurple">
          {/* header  */}
          <header className="shadow-sm sticky top-0 z-50 bg-white">
            <div className="max-w-7xl  mx-auto px-3 sm:px-5 lg:px-7">  
              <div className="flex justify-between items-center py-2 ">
                <div className="flex items-center space-x-1 mt-1">
                    <img src="logo.png" alt="Heal AI Logo" className="h-[50px] w-[50px]" />
                     <span className="text-2xl font-bold text-purple-500 hover:text-purple-700 transition-colors ">Heal.ai</span>
                </div>
               
             
          

            {/* Get Started Button */}
            <div className="hidden md:block">
              <button 
              onClick={handleclick}
               className="bg-purple-500 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors font-medium">
                Let's find your mood!!
               
              </button>
            </div>
          </div>

           
        </div>
      </header>
        
            <section className="relative flex justify-center items-center p-6">
              <div className="w-full max-w-5xl relative">
           <img
              src="smile.jpg"
              alt="Healing illustration"
              className="w-full max-h-[80vh] object-cover rounded-lg shadow-md"
            />


                {/* Joke Overlay */}
               <div className="absolute inset-0 flex items-center justify-center px-2 sm:px-4">
              <div className="bg-white/70 text-black p-3 sm:p-6 rounded-lg max-w-full sm:max-w-2xl text-center">
                <p className="text-base sm:text-xl md:text-xl font-semibold leading-snug sm:leading-relaxed typewriter">
                  {joke}
                </p>
              </div>
            </div>

              </div>
         </section>

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
    )
  
};

export default Page;
