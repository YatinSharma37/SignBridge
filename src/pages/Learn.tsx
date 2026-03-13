import { useRef, useState, useEffect } from "react";  

// add useEffect but its not initialized

export default function SignLanguageTranslator() {
  const videoRef = useRef(null);
  const [streamStarted, setStreamStarted] = useState(false);

  const startCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setStreamStarted(true);
      })
      .catch((err) => {
        console.error("Error accessing camera: ", err);
        alert("Unable to access the camera. Please allow permission in your browser.");
      });
  };

  useEffect(() => {
  if (!streamStarted) {
    startCamera();
  }
}, [streamStarted]);


  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 z-50">
        <nav className="max-w-[1515px] mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 no-underline" aria-label="SignVerse Home">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-blue-700"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>
            <span className="text-xl font-bold text-gray-900">SignVerse</span>
          </a>
          <div className="hidden md:flex items-center gap-6">
            <a href="/" className="px-3 py-2 rounded-md flex items-center space-x-1 text-blue-700 font-semibold">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>
              <span>Home</span>
            </a>
            <a href="/courses" className="px-3 py-2 rounded-md flex items-center space-x-1 text-gray-600 hover:text-blue-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
              <span>Courses</span>
            </a>
            <a href="/gesture.html" className="px-3 py-2 rounded-md flex items-center space-x-1 text-gray-600 hover:text-blue-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"/></svg>
              <span>Translator</span>
            </a>
          </div>
        </nav>
      </header>

      <main className="flex-grow pt-24 px-4 bg-gradient-to-br from-gray-100 via-yellow-100 to-pink-100 flex justify-center items-center">
        <div className="w-full max-w-md mx-auto bg-white p-4 rounded-lg shadow-lg flex flex-col items-center justify-center space-y-4">
          <h2 className="text-xl font-bold text-gray-800">Translator</h2>

          {!streamStarted ? (
            <>
              <p className="text-gray-500 text-sm">Click the button below to enable the camera.</p>
              <button
                onClick={startCamera}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Allow Camera
              </button>
            </>
          ) : (
            <video ref={videoRef} autoPlay playsInline className="rounded-lg border border-gray-300 w-full h-auto"></video>
          )}
        </div>
      </main>

      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-blue-400"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>
                <span className="text-xl font-bold">SignVerse</span>
              </div>
              <p className="text-gray-400 mb-4">Breaking barriers through sign language. Learn, practice, and communicate effortlessly.</p>
              <div className="flex space-x-4">
              
  <div className="flex justify-center space-x-4 mb-2">
    <a href="/" className="text-gray-400 hover:text-white transition-colors">
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-twitter w-5 h-5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg></a>
    <a href="/" className="text-gray-400 hover:text-white transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-facebook w-5 h-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg> </a>
    <a href="/" className="text-gray-400 hover:text-white transition-colors">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-instagram w-5 h-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg> </a>
    <a href="https://github.com/vipin379/IP-II-Project.git" className="text-gray-400 hover:text-white transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-github w-5 h-5"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg> </a>
  </div>
  
              </div>
            </div>
            {/* Footer Links */}
            <div><h3 className="text-lg font-semibold mb-4">Learn</h3><ul className="space-y-2"><li><a className="text-gray-400 hover:text-white" href="/courses">Courses</a></li><li><a className="text-gray-400 hover:text-white" href="/learn">Translator</a></li><li><a className="text-gray-400 hover:text-white" href="/dashboard">Dashboard</a></li><li><a href="/" className="text-gray-400 hover:text-white">Resources</a></li></ul></div>
            <div><h3 className="text-lg font-semibold mb-4">Company</h3><ul className="space-y-2"><li><a href="/" className="text-gray-400 hover:text-white">About Us</a></li><li><a href="/" className="text-gray-400 hover:text-white">Careers</a></li><li><a href="/" className="text-gray-400 hover:text-white">Contact</a></li><li><a href="/" className="text-gray-400 hover:text-white">Blog</a></li></ul></div>
            <div><h3 className="text-lg font-semibold mb-4">Support</h3><ul className="space-y-2"><li><a href="/" className="text-gray-400 hover:text-white">Help Center</a></li><li><a href="/" className="text-gray-400 hover:text-white">Privacy Policy</a></li><li><a href="/" className="text-gray-400 hover:text-white">Terms of Service</a></li><li><a href="/" className="text-gray-400 hover:text-white">Accessibility</a></li></ul></div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
            <p>© 2025 SignWave. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
