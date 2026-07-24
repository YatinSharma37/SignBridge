import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  CameraOff,
  Copy,
  Volume2,
  RotateCcw,
  Wifi,
  WifiOff,
  Info,
  CheckCircle,
} from "lucide-react";

const FLASK_BASE = "http://localhost:5000";
const POLL_INTERVAL = 800; // ms

export default function SignLanguageTranslator() {
  // ── backend connectivity ──────────────────────────────────────────
  const [backendOnline, setBackendOnline] = useState<boolean | null>(null); // null = checking
  const [checkingBackend, setCheckingBackend] = useState(true);

  // ── recognized text ───────────────────────────────────────────────
  const [recognizedText, setRecognizedText] = useState("");
  const [copied, setCopied] = useState(false);

  // ── refs ──────────────────────────────────────────────────────────
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // ── check if flask backend is reachable ───────────────────────────
  const checkBackend = useCallback(async () => {
    setCheckingBackend(true);
    try {
      const res = await fetch(`${FLASK_BASE}/recognized_text`, {
        signal: AbortSignal.timeout(2000),
      });
      if (res.ok) {
        setBackendOnline(true);
      } else {
        setBackendOnline(false);
      }
    } catch {
      setBackendOnline(false);
    } finally {
      setCheckingBackend(false);
    }
  }, []);

  useEffect(() => {
    checkBackend();
  }, [checkBackend]);

  // ── poll recognized text when backend is online ───────────────────
  useEffect(() => {
    if (!backendOnline) {
      if (pollRef.current) clearInterval(pollRef.current);
      return;
    }

    const poll = async () => {
      try {
        const res = await fetch(`${FLASK_BASE}/recognized_text`);
        if (res.ok) {
          const data = await res.json();
          setRecognizedText(data.text || "");
        }
      } catch {
        // backend went offline while polling
        setBackendOnline(false);
      }
    };

    poll();
    pollRef.current = setInterval(poll, POLL_INTERVAL);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [backendOnline]);

  // ── reset recognized text via flask api ───────────────────────────
  const handleReset = async () => {
    if (!backendOnline) return;
    try {
      await fetch(`${FLASK_BASE}/reset_text`, { method: "POST" });
      setRecognizedText("");
    } catch {
      setRecognizedText("");
    }
  };

  // ── copy to clipboard ─────────────────────────────────────────────
  const handleCopy = () => {
    if (!recognizedText) return;
    navigator.clipboard.writeText(recognizedText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // ── text-to-speech ────────────────────────────────────────────────
  const handleSpeak = () => {
    if (!recognizedText || !("speechSynthesis" in window)) return;
    const utterance = new SpeechSynthesisUtterance(recognizedText);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      {/* ── Navbar ── */}
      <header className="fixed top-0 left-0 w-full bg-slate-900/80 backdrop-blur-md border-b border-white/10 z-50">
        <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 no-underline" aria-label="SignVerse Home">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
              stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m5 8 6 6" /><path d="m4 14 6-6 2-3" /><path d="M2 5h12" />
              <path d="M7 2h1" /><path d="m22 22-5-10-5 10" /><path d="M14 18h6" />
            </svg>
            <span className="text-xl font-bold text-white">SignVerse</span>
          </a>
          <div className="hidden md:flex items-center gap-6">
            <a href="/" className="text-gray-400 hover:text-white transition-colors text-sm">Home</a>
            <a href="/courses" className="text-gray-400 hover:text-white transition-colors text-sm">Courses</a>
            <a href="/learn" className="text-blue-400 font-semibold text-sm">Translator</a>
            <a href="/dashboard" className="text-gray-400 hover:text-white transition-colors text-sm">Dashboard</a>
          </div>
        </nav>
      </header>

      {/* ── Main ── */}
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">

          {/* Page title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              Sign Language{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Translator
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Show ASL signs to the camera — our AI model converts your gestures to text in real time.
            </p>
          </motion.div>

          {/* ── Backend status banner ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`flex items-center gap-3 mb-6 px-5 py-3 rounded-xl border text-sm font-medium ${
              checkingBackend
                ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-300"
                : backendOnline
                ? "bg-green-500/10 border-green-500/30 text-green-300"
                : "bg-red-500/10 border-red-500/30 text-red-300"
            }`}
          >
            {checkingBackend ? (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-yellow-300 border-t-transparent animate-spin" />
                Checking connection to gesture recognition engine…
              </>
            ) : backendOnline ? (
              <>
                <Wifi className="w-4 h-4" />
                AI Engine connected — gesture recognition is live!
              </>
            ) : (
              <>
                <WifiOff className="w-4 h-4" />
                AI Engine offline.&nbsp;
                <span className="font-normal text-red-200">
                  Start the Python server:&nbsp;
                  <code className="bg-red-900/40 px-2 py-0.5 rounded font-mono text-xs">
                    cd Gesture &amp;&amp; python test.py
                  </code>
                  &nbsp;then&nbsp;
                  <button
                    onClick={checkBackend}
                    className="underline hover:no-underline cursor-pointer"
                  >
                    retry
                  </button>
                </span>
              </>
            )}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* ── Left: Video feed ── */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <Camera className="w-5 h-5 text-blue-400" />
                  Camera Feed
                </div>
                {backendOnline && (
                  <span className="flex items-center gap-1.5 text-xs text-green-400">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    LIVE
                  </span>
                )}
              </div>

              <div className="relative aspect-video bg-slate-900 flex items-center justify-center">
                {backendOnline ? (
                  /* Flask streams processed video with bounding boxes */
                  <img
                    ref={imgRef}
                    src={`${FLASK_BASE}/video_feed`}
                    alt="Live gesture recognition feed"
                    className="w-full h-full object-cover"
                    onError={() => setBackendOnline(false)}
                  />
                ) : (
                  <OfflineCamera />
                )}
              </div>
            </motion.div>

            {/* ── Right: Translation output ── */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col gap-4"
            >
              {/* Output box */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl flex-1 flex flex-col">
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                  <span className="text-white font-semibold">Recognized Text</span>
                  <div className="flex items-center gap-2">
                    <ActionBtn
                      onClick={handleReset}
                      disabled={!backendOnline || !recognizedText}
                      title="Clear"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </ActionBtn>
                    <ActionBtn
                      onClick={handleSpeak}
                      disabled={!recognizedText}
                      title="Speak"
                    >
                      <Volume2 className="w-4 h-4" />
                    </ActionBtn>
                    <ActionBtn
                      onClick={handleCopy}
                      disabled={!recognizedText}
                      title="Copy"
                    >
                      <AnimatePresence mode="wait">
                        {copied ? (
                          <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          </motion.span>
                        ) : (
                          <motion.span key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                            <Copy className="w-4 h-4" />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </ActionBtn>
                  </div>
                </div>

                <div className="flex-1 p-5 min-h-[180px]">
                  {recognizedText ? (
                    <motion.p
                      key={recognizedText}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-white text-xl leading-relaxed tracking-wide font-medium"
                    >
                      {recognizedText}
                    </motion.p>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-gray-500 text-sm text-center gap-2">
                      {backendOnline ? (
                        <>
                          <div className="w-8 h-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin mb-1" />
                          Waiting for gestures…
                          <span className="text-xs">Show an ASL sign to the camera</span>
                        </>
                      ) : (
                        <>
                          <CameraOff className="w-8 h-8 text-gray-600" />
                          Start the Python backend to enable live translation
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* How it works */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-5">
                <div className="flex items-center gap-2 text-blue-300 font-semibold mb-3">
                  <Info className="w-4 h-4" />
                  How it works
                </div>
                <ol className="text-gray-400 text-sm space-y-2 list-none">
                  {[
                    "Start the Python server inside the Gesture/ folder",
                    "Allow camera access when prompted",
                    "Hold an ASL sign steady for ~1 second",
                    "The recognized word/letter appears in the output box",
                    "Use Speak to hear the translated text aloud",
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 text-xs flex items-center justify-center font-bold mt-0.5">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Quick-start command */}
              <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-5">
                <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">
                  Start the AI engine
                </p>
                <code className="text-green-300 text-sm font-mono block">
                  cd Gesture &amp;&amp; pip install flask cvzone tensorflow opencv-python &amp;&amp; python test.py
                </code>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="bg-slate-900 border-t border-white/10 text-gray-500 py-6 text-center text-sm">
        © 2025 SignVerse. All rights reserved.
      </footer>
    </div>
  );
}

/* ── Small helpers ── */
function ActionBtn({
  children,
  onClick,
  disabled,
  title,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  title: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-2 rounded-lg transition-colors ${
        disabled
          ? "text-gray-600 cursor-not-allowed"
          : "text-gray-300 hover:bg-white/10 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function OfflineCamera() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center px-6">
      <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center">
        <CameraOff className="w-10 h-10 text-gray-600" />
      </div>
      <div>
        <p className="text-gray-400 font-medium">AI Engine not running</p>
        <p className="text-gray-600 text-sm mt-1">
          Start the Python Flask server to see the live gesture feed
        </p>
      </div>
    </div>
  );
}
