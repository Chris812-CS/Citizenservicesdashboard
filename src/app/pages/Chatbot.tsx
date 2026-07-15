import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import {
  ArrowLeft,
  Bot,
  Send,
  Mic,
  AlertCircle,
  CreditCard,
  Car,
  Info,
  ArrowRight,
  User,
  Loader2,
  Bell,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type MessageType = {
  id: string;
  text: string;
  sender: "user" | "bot" | "agent";
  isAlert?: boolean;
  action?: {
    label: string;
    route: string;
    icon?: React.ReactNode;
  };
  options?: {
    label: string;
    value: string;
  }[];
};

export function Chatbot() {
  const navigate = useNavigate();
  const location = useLocation();
  const [language, setLanguage] = useState<"BM" | "EN">(
    location.state?.language || "BM",
  );
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [agentMode, setAgentMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping, isConnecting, agentMode]);

  useEffect(() => {
    // Only set the initial "Welcome" and "Alert" messages if the chat is empty.
    // This prevents the history from being wiped when switching to Agent Mode.
    setMessages((prev) => {
      if (prev.length > 0) return prev;

      return [
        {
          id: "1",
          text:
            language === "BM"
              ? "Selamat datang ke AI Chatbot Perkhidmatan Rakyat! Saya sedia membantu anda."
              : "Welcome to Citizen Services AI Chatbot! I am ready to help you.",
          sender: "bot",
        },
        {
          id: "2",
          text:
            language === "BM"
              ? "Perhatian: Sistem kami mengesan bahawa Lesen Memandu (CDL) anda telah tamat tempoh pada 15 Mac 2026. Adakah anda ingin memperbaharuinya sekarang?"
              : "Alert: Our system detected that your Driving License (CDL) expired on 15 March 2026. Would you like to renew it now?",
          sender: "bot",
          isAlert: true,
          action: {
            label:
              language === "BM"
                ? "Perbaharui Lesen (MyJPJ)"
                : "Renew License (MyJPJ)",
            route: "/super-app?service=myjpj",
            icon: <Car className="w-4 h-4" />,
          },
        },
      ];
    });
  }, [language]); // Removed agentMode from dependencies

  const handleSend = (overrideText?: string) => {
    const textToProcess = overrideText || message;
    if (!textToProcess.trim()) return;

    // Step 1: The Ask
    const userMessage: MessageType = {
      id: Date.now().toString(),
      text: textToProcess,
      sender: "user",
    };
    setMessages((prev) => [...prev, userMessage]);
    if (!overrideText) setMessage("");

    setIsTyping(true);

    // Step 2: The Delay (1200ms)
    setTimeout(() => {
      setIsTyping(false);

      const lowerText = textToProcess.toLowerCase();
      const isSmartQuery =
        // Road Tax terms
        lowerText.includes("road tax") ||
        // License terms
        lowerText.includes("lesen") ||
        lowerText.includes("license") ||
        // Agency / General terms
        lowerText.includes("jpj") ||
        lowerText.includes("transport department") ||
        // Action terms
        lowerText.includes("renew") ||
        lowerText.includes("perbaharui");

      if (isSmartQuery && !agentMode) {
        // Smart Answer Logic (Success Case)
        const botResponse: MessageType = {
          id: (Date.now() + 1).toString(),
          text:
            language === "BM"
              ? "Saya dapati anda bertanya mengenai maklumat kenderaan/cukai jalan. Adakah anda ingin terus ke portal MyJPJ untuk menyemak maklumat tersebut?"
              : "I noticed you are asking about vehicles/road tax. Would you like to go directly to the MyJPJ portal to check this information?",
          sender: "bot",
          options: [
            {
              label:
                language === "BM"
                  ? "Ya (Buka MyJPJ)"
                  : "Yes (Open MyJPJ)",
              value: "navigate_jpj",
            },
            {
              label: language === "BM" ? "Tidak" : "No",
              value: "no",
            },
          ],
        };
        setMessages((prev) => [...prev, botResponse]);
      } else if (agentMode) {
        // Agent responding normally
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            text:
              language === "BM"
                ? "Saya sedang menyemak perkara ini untuk anda sebentar."
                : "I am checking on this for you right now.",
            sender: "agent",
          },
        ]);
      } else {
        // The Choice (Fallback Frame)
        const botResponse: MessageType = {
          id: (Date.now() + 1).toString(),
          text:
            language === "BM"
              ? "Maaf, saya tidak mempunyai maklumat terperinci mengenai perkara ini. Adakah anda ingin bercakap dengan pegawai khidmat pelanggan?"
              : "I'm sorry, I don't have detailed information on this. Would you like to speak with a customer service officer?",
          sender: "bot",
          options: [
            {
              label: language === "BM" ? "Ya" : "Yes",
              value: "yes",
            },
            {
              label: language === "BM" ? "Tidak" : "No",
              value: "no",
            },
          ],
        };
        setMessages((prev) => [...prev, botResponse]);
      }
    }, 1200);
  };

  const handleOptionClick = (value: string, label: string) => {
    // Remove options from UI
    setMessages((prev) =>
      prev.map((m) =>
        m.options ? { ...m, options: undefined } : m,
      ),
    );

    // Add User's selected answer as a message
    const userMsg: MessageType = {
      id: Date.now().toString(),
      text: label,
      sender: "user",
    };
    setMessages((prev) => [...prev, userMsg]);

    if (value === "navigate_jpj") {
      // Smart Answer Navigation
      navigate("/super-app?service=myjpj", {
        state: { language },
      });
    } else if (value === "yes") {
      // Step 3: Open Overlay "Connecting..."
      setIsConnecting(true);

      // Step 4: The Handover Delay
      setTimeout(() => {
        setIsConnecting(false);
        setAgentMode(true);

        setMessages((prev) => {
          const farisMessage: MessageType = {
            id: `faris-${Date.now()}`,
            text:
              language === "BM"
                ? "Selamat sejahtera, saya Faris. Saya telah melihat sejarah perbualan anda. Bagaimana saya boleh bantu anda?"
                : "Good day, I'm Faris. I've reviewed your chat history. How can I assist you today?",
            sender: "agent",
          };
          return [...prev, farisMessage];
        });
      }, 1500);
    } else {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            text:
              language === "BM"
                ? "Baiklah. Ada apa-apa lagi yang boleh saya bantu?"
                : "Alright. Is there anything else I can help you with?",
            sender: agentMode ? "agent" : "bot",
          },
        ]);
      }, 800);
    }
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleActionClick = (route: string) => {
    navigate(route, { state: { language } });
  };

  const suggestions =
    language === "BM"
      ? [
          {
            id: "s1",
            title: "Polisi Baru: SARA Wallet",
            desc: "Tebus RM1000 bantuan terus",
            icon: (
              <CreditCard className="w-5 h-5 text-[#003399]" />
            ),
            route: "/super-app?service=sara",
          },
          {
            id: "s2",
            title: "Pemeriksaan Kesihatan",
            desc: "Tempah janji temu percuma",
            icon: <Info className="w-5 h-5 text-[#003399]" />,
            route: "/super-app?service=healthcare",
          },
        ]
      : [
          {
            id: "s1",
            title: "New Policy: SARA Wallet",
            desc: "Claim RM1000 direct assistance",
            icon: (
              <CreditCard className="w-5 h-5 text-[#003399]" />
            ),
            route: "/super-app?service=sara",
          },
          {
            id: "s2",
            title: "Health Screening",
            desc: "Book a free appointment",
            icon: <Info className="w-5 h-5 text-[#003399]" />,
            route: "/super-app?service=healthcare",
          },
        ];

  return (
    <div
      className="min-h-screen bg-[#F8FAFC] flex flex-col relative"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      {/* Header */}
      <header className="bg-white px-4 py-4 shadow-sm sticky top-0 z-20">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (location.state?.from) {
                  navigate(location.state.from, { state: { language } });
                } else {
                  navigate("/super-app", { state: { language } });
                }
              }}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[#003399]" />
            </button>
            <AnimatePresence mode="wait">
              {agentMode ? (
                <motion.div
                  key="agent-header"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex items-center gap-3"
                >
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-md">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-[15px]">
                      {language === "BM"
                        ? "Pegawai Faris (Online)"
                        : "Officer Faris (Online)"}
                    </p>
                    <p className="text-xs font-medium text-green-600">
                      {language === "BM"
                        ? "Ejen Khidmat Pelanggan"
                        : "Customer Service Agent"}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="bot-header"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex items-center gap-3"
                >
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#003399] to-[#0066CC] rounded-full flex items-center justify-center shadow-md">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  <div>
                    <p className="font-bold text-[#003399] text-[15px]">
                      {language === "BM"
                        ? "Pembantu AI Pintar"
                        : "Smart AI Assistant"}
                    </p>
                    <p className="text-xs font-medium text-slate-500">
                      {language === "BM"
                        ? "Perkhidmatan Rakyat"
                        : "Citizen Services"}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setLanguage(language === "BM" ? "EN" : "BM")}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-[#003399] font-bold text-xs hover:bg-slate-200 transition-colors"
            >
              {language}
            </button>
            <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 bg-[#F8FAFC] relative">
        <div className="max-w-4xl mx-auto space-y-6 pb-4">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className="flex gap-2 max-w-[85%] lg:max-w-[65%]">
                  {msg.sender === "agent" && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0 mt-1">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                  {msg.sender === "bot" && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#003399] to-[#0066CC] flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}

                  <div className="flex flex-col gap-2 w-full">
                    <div
                      className={`rounded-2xl p-4 shadow-sm w-full ${
                        msg.sender === "user"
                          ? "bg-[#003399] text-white rounded-tr-sm"
                          : msg.isAlert
                            ? "bg-red-50 border border-red-100 text-slate-800 rounded-tl-sm"
                            : msg.sender === "agent"
                              ? "bg-green-50 border border-green-100 text-slate-800 rounded-tl-sm"
                              : "bg-white border border-slate-100 text-slate-800 rounded-tl-sm"
                      }`}
                    >
                      {msg.isAlert && (
                        <div className="flex items-center gap-2 mb-2 text-red-600">
                          <AlertCircle className="w-5 h-5" />
                          <span className="font-bold text-sm">
                            {language === "BM"
                              ? "Tindakan Diperlukan"
                              : "Action Required"}
                          </span>
                        </div>
                      )}

                      <p
                        className={`text-[15px] leading-relaxed whitespace-pre-wrap ${msg.sender === "user" ? "text-white" : "text-slate-700"}`}
                      >
                        {msg.text}
                      </p>

                      {msg.action && (
                        <button
                          onClick={() =>
                            handleActionClick(msg.action!.route)
                          }
                          className={`mt-4 flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-sm active:scale-95 ${
                            msg.sender === "user"
                              ? "bg-white text-[#003399] hover:bg-slate-50"
                              : "bg-[#003399] hover:bg-[#002266] text-white"
                          }`}
                        >
                          {msg.action.icon}
                          {msg.action.label}
                        </button>
                      )}
                    </div>

                    {/* Inline Options (Yes / No) */}
                    {msg.options && (
                      <div className="flex gap-2 mt-1">
                        {msg.options.map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() =>
                              handleOptionClick(
                                opt.value,
                                opt.label,
                              )
                            }
                            className="flex-1 bg-white border border-[#003399]/30 text-[#003399] hover:bg-blue-50 py-2.5 px-3 rounded-xl font-semibold text-sm transition-colors active:scale-95 shadow-sm whitespace-nowrap"
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex justify-start gap-2 max-w-[85%] lg:max-w-[65%]"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${agentMode ? "bg-gradient-to-br from-green-500 to-emerald-600" : "bg-gradient-to-br from-[#003399] to-[#0066CC]"}`}
                >
                  {agentMode ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                <div
                  className={`bg-white border border-slate-100 rounded-2xl rounded-tl-sm p-4 shadow-sm flex items-center gap-1.5 h-[52px]`}
                >
                  <div
                    className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} className="h-4" />
        </div>

        {/* Step 4: Connecting Overlay (Fixed bottom center) */}
        <AnimatePresence>
          {isConnecting && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute inset-x-0 bottom-6 flex justify-center z-10 pointer-events-none"
            >
              <div className="bg-white/95 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-200 flex flex-col items-center gap-3 text-center mx-4 max-w-sm w-full">
                <Loader2 className="w-8 h-8 text-[#003399] animate-spin" />
                <p className="text-sm font-semibold text-[#003399] whitespace-pre-line">
                  {language === "BM"
                    ? "Menghubungkan anda dengan Pegawai Faris...\n(Menunggu: < 2 min)"
                    : "Connecting you to Officer Faris...\n(Wait time: < 2 mins)"}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area & Bubbles */}
      <div className="bg-white border-t border-slate-100 z-10">
        <div className="max-w-4xl mx-auto">
          {/* Suggestion Bubbles Carousel */}
          <div className="px-4 py-4 overflow-x-auto flex gap-3 hide-scrollbar pb-2">
            {suggestions.map((suggestion) => (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                key={suggestion.id}
                onClick={() =>
                  handleActionClick(suggestion.route)
                }
                className="flex-shrink-0 flex items-center gap-3 bg-gradient-to-r from-[#F0F5FF] to-white border border-[#003399]/20 p-3 rounded-2xl shadow-sm hover:shadow-md transition-all text-left min-w-[240px]"
              >
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                  {suggestion.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-[#003399]">
                    {suggestion.title}
                  </p>
                  <p className="text-xs text-slate-500">
                    {suggestion.desc}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#003399]/50" />
              </motion.button>
            ))}
          </div>

          <div className="px-4 pb-6 pt-2 flex items-end gap-2">
            <div className="flex-1 bg-slate-50 border border-slate-200 rounded-3xl p-1 flex items-center gap-2 shadow-inner">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={
                  language === "BM"
                    ? "Tanya saya apa sahaja..."
                    : "Ask me anything..."
                }
                className="flex-1 bg-transparent outline-none text-[15px] text-slate-800 placeholder:text-slate-400 px-4 py-3"
              />
              <button
                onClick={() => handleSend()}
                className={`p-3 rounded-full transition-colors flex items-center justify-center ${
                  message.trim()
                    ? "bg-[#003399] text-white shadow-md hover:bg-[#002266]"
                    : "bg-slate-200 text-slate-400"
                }`}
                disabled={!message.trim()}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <button className="bg-[#FFC72C] hover:bg-[#E6B325] text-[#003399] p-4 rounded-full transition-colors shadow-md flex items-center justify-center">
              <Mic className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}