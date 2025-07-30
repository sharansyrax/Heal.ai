"use client";
import React, { useState } from 'react';
import { ChevronDown, Heart, Brain, BarChart3, Headphones, Palette, Shield, Users, Clock, CheckCircle, Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

const HealAILanding = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const router = useRouter();
  const handleGetStarted=()=>{
    router.push('/sign-up')
  }

  const features = [
    {
      icon: <Brain className="w-12 h-12 text-purple-600" />,
      title: "Emotion Detector",
      description: "Advanced AI technology for real-time emotional awareness and instant feedback."
    },
    {
      icon: <Heart className="w-12 h-12 text-purple-600" />,
      title: "AI Doctor Consultation",
      description: "Personalized mental health guidance from our intelligent consultation system."
    },
    {
      icon: <BarChart3 className="w-12 h-12 text-purple-600" />,
      title: "Emotional Dashboard",
      description: "Beautiful visualizations to track your emotional patterns and growth."
    },
    {
      icon: <Headphones className="w-12 h-12 text-purple-600" />,
      title: "Guided Meditation",
      description: "Tailored meditation sessions designed for your emotional needs."
    },
    {
      icon: <Palette className="w-12 h-12 text-purple-600" />,
      title: "Emotion Art Pad",
      description: "Express emotions creatively through our interactive digital platform."
    }
  ];

  const userTypes = [
    {
      title: "Individuals",
      description: "Track your emotional well-being with personalized insights and AI-powered recommendations.",
      highlight: "providing consistent emotional support"
    },
    {
      title: "Therapists",
      description: "Enhance sessions with data-driven insights to better understand client patterns.",
      highlight: "clearly convey progress"
    },
    {
      title: "Organizations",
      description: "Support employee mental health with comprehensive wellness programs.",
      highlight: "Improving workplace wellbeing"
    }
  ];

  const usageSteps = [
    {
      title: "Emotion Detection",
      description: "AI analyzes your emotional state through various inputs and interactions.",
      image: "🧠"
    },
    {
      title: "Personalized Insights",
      description: "Get tailored recommendations based on your unique emotional patterns.",
      image: "📊"
    },
    {
      title: "Track Progress",
      description: "Monitor your emotional journey with beautiful, exportable reports.",
      image: "📈"
    }
  ];

  const faqs = [
    {
      question: "How accurate is the emotion detection?",
      answer: "Our AI emotion detection uses advanced machine learning algorithms with 95%+ accuracy, trained on millions of emotional data points."
    },
    {
      question: "Is my emotional data kept private?",
      answer: "Absolutely. We use end-to-end encryption and never share your personal emotional data with third parties."
    },
    {
      question: "Can Heal AI replace professional therapy?",
      answer: "Heal AI complements professional mental health care. We encourage users to seek professional help when needed."
    },
    {
      question: "What devices does Heal AI work on?",
      answer: "Heal AI works seamlessly across all devices - desktop, tablet, and mobile with synchronized data."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Navigation */}
      <nav className="bg-gradient-to-r from-white  to-purple-200  border-b border-purple-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Brain className="w-8 h-8 text-purple-400 mr-2" />
                <span className="text-2xl font-bold text-purple-400">Heal AI</span>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#features" className="text-gray-600 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors">Features</a>
                <a href="#how-it-works" className="text-gray-600 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors">How it Works</a>
                <a href="#pricing" className="text-gray-600 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors">Pricing</a>
                <a href="#about" className="text-gray-600 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors">About</a>
              
                <button 
                  onClick={handleGetStarted}
                  className="bg-purple-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-800 transition-colors"
                >
                  Login
                </button>
              </div>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-600 hover:text-purple-600"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#features" className="text-gray-600 hover:text-purple-600 block px-3 py-2 text-base font-medium">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-purple-600 block px-3 py-2 text-base font-medium">How it Works</a>
              <a href="#pricing" className="text-gray-600 hover:text-purple-600 block px-3 py-2 text-base font-medium">Pricing</a>
              <a href="#about" className="text-gray-600 hover:text-purple-600 block px-3 py-2 text-base font-medium">About</a>

              <button 
                onClick={handleGetStarted}
                className="bg-gray-900 text-white block px-3 py-2 text-base font-medium w-full text-left rounded-lg mt-2"
              >
                Login
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      {/* Hero Section */}
<section   className=" features relative bg-gradient-to-b from-purple-50 via-white to-white py-20 overflow-hidden">
  {/* Subtle animated blobs background */}
  {/* <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
  <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-20 animate-pulse"></div> */}

  <div  className=" bg-gradient-to-b from-purple-50 via-white to-white max-w-4xl mx-auto text-center px-4 relative z-10">
    <div className="inline-block bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-sm">
      🤖 Ai + Heal🧑‍⚕️
    </div>
    
    <h1 className="text-5xl md:text-8xl font-serif tracking-tight mb-6 font-sans leading-tight">
      <span className="bg-gradient-to-r from-purple-500 to-purple-400 bg-clip-text text-transparent">
        AI That Understands you
      </span>
    </h1>
    
    <p className="text-xl text-purple-500 hover:font-bold  mb-8 max-w-2xl mx-auto leading-relaxed transition-all">
      Experience the future of emotional intelligence.</p>
    
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      <button    onClick={handleGetStarted}  className="px-8 py-4 bg-gradient-to-r from-purple-400 to-purple-600 text-white text-lg font-medium rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all">
        🤩 Let's find your mood
      </button>
      
    </div>

  
  </div>
</section>


      {/* Demo/Preview Section */}
   <section id="features"  className="py-16 bg-gradient-to-b from-purple-50 to-purple-100 scroll-smooth">
  <div className="max-w-7xl mx-auto px-4">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-purple-900">
      What We Offer
    </h2>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      
      {/* Emotion Detector */}
      <div className="bg-white rounded-xl p-6 shadow-md border border-purple-100 hover:shadow-xl hover:scale-105 transition-all duration-300">
        <div className="w-full h-40 bg-gradient-to-br from-purple-300 to-purple-400 rounded-lg mb-4 flex items-center justify-center">
          <span className="text-5xl">😊</span>
        </div>
        <h3 className="text-lg font-semibold text-purple-800 text-center">Emotion Detector</h3>
        <p className="text-sm text-purple-700 text-center mt-2">
          Detect emotions in real-time using AI-powered facial recognition.
        </p>
      </div>

      {/* AI Doctor */}
      <div className="bg-white rounded-xl p-6 shadow-md border border-purple-100 hover:shadow-xl hover:scale-105 transition-all duration-300">
        <div className="w-full h-40 bg-gradient-to-br from-violet-300 to-violet-500 rounded-lg mb-4 flex items-center justify-center">
          <span className="text-5xl">🩺</span>
        </div>
        <h3 className="text-lg font-semibold text-purple-800 text-center">AI Doctor</h3>
        <p className="text-sm text-purple-700 text-center mt-2">
          Get AI-assisted mental health advice and recommendations instantly.
        </p>
      </div>

      {/* Emotional Dashboard */}
      <div className="bg-white rounded-xl p-6 shadow-md border border-purple-100 hover:shadow-xl hover:scale-105 transition-all duration-300">
        <div className="w-full h-40 bg-gradient-to-br from-fuchsia-300 to-purple-500 rounded-lg mb-4 flex items-center justify-center">
          <span className="text-5xl">📊</span>
        </div>
        <h3 className="text-lg font-semibold text-purple-800 text-center">Emotional Dashboard</h3>
        <p className="text-sm text-purple-700 text-center mt-2">
          Track your emotional trends and progress over time.
        </p>
      </div>

      {/* Emotional Art Pad */}
      <div className="bg-white rounded-xl p-6 shadow-md border border-purple-100 hover:shadow-xl hover:scale-105 transition-all duration-300">
        <div className="w-full h-40 bg-gradient-to-br from-pink-300 to-purple-400 rounded-lg mb-4 flex items-center justify-center">
          <span className="text-5xl">🎨</span>
        </div>
        <h3 className="text-lg font-semibold text-purple-800 text-center">Emotional Art Pad</h3>
        <p className="text-sm text-purple-700 text-center mt-2">
          Express emotions creatively through AI-generated art.
        </p>
      </div>

      {/* Meditation */}
      <div className="bg-white rounded-xl p-6 shadow-md border border-purple-100 hover:shadow-xl hover:scale-105 transition-all duration-300">
        <div className="w-full h-40 bg-gradient-to-br from-purple-200 to-purple-300 rounded-lg mb-4 flex items-center justify-center">
          <span className="text-5xl">🧘‍♂️</span>
        </div>
        <h3 className="text-lg font-semibold text-purple-800 text-center">Meditation</h3>
        <p className="text-sm text-purple-700 text-center mt-2">
          Guided meditation sessions tailored to your current mood.
        </p>
      </div>

      {/* Mental Health Journal */}
      <div className="bg-white rounded-xl p-6 shadow-md border border-purple-100 hover:shadow-xl hover:scale-105 transition-all duration-300">
        <div className="w-full h-40 bg-gradient-to-br from-lavender-300 to-purple-400 rounded-lg mb-4 flex items-center justify-center">
          <span className="text-5xl">📓</span>
        </div>
        <h3 className="text-lg font-semibold text-purple-800 text-center">Mental Health Journal</h3>
        <p className="text-sm text-purple-700 text-center mt-2">
          Keep track of your daily thoughts, feelings, and reflections.
        </p>
      </div>

    </div>
  </div>
</section>



    
  

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transform transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6 border-t border-gray-200">
                    <p className="text-gray-600 leading-relaxed pt-4">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

   
      {/* Footer */}
      <footer id="about" className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Brain className="w-6 h-6 text-purple-600 mr-2" />
                <span className="text-lg font-bold text-gray-900">Heal AI</span>
              </div>
              <p className="text-gray-600 mb-4">
                Consistent AI emotional intelligence generator for professionals
              </p>
              <p className="text-sm text-gray-500">© Copyright 2025</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Generators</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li><a href="#" className="hover:text-purple-600">Emotion Detector</a></li>
                <li><a href="#" className="hover:text-purple-600">AI Consultation</a></li>
                <li><a href="#" className="hover:text-purple-600">Meditation Guide</a></li>
                <li><a href="#" className="hover:text-purple-600">Art Therapy</a></li>
                <li><a href="#" className="hover:text-purple-600">Mood Tracker</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li><a href="#" className="hover:text-purple-600">About</a></li>
                <li><a href="#" className="hover:text-purple-600">Contact</a></li>
                <li><a href="#" className="hover:text-purple-600">Pricing</a></li>
                <li><a href="#" className="hover:text-purple-600">API</a></li>
                <li><a href="#" className="hover:text-purple-600">Terms of Service</a></li>
                <li><a href="#" className="hover:text-purple-600">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li><a href="#" className="hover:text-purple-600">User Guide</a></li>
                <li><a href="#" className="hover:text-purple-600">Examples</a></li>
                <li><a href="#" className="hover:text-purple-600">Best Practices</a></li>
                <li><a href="#" className="hover:text-purple-600">Export Guide</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HealAILanding;