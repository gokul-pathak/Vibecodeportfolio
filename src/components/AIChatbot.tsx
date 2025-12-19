import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, Send, Mic, MicOff, X, Sparkles, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI assistant. Ask me anything about my skills, experience, projects, or how I can help your team! 🚀",
      isBot: true,
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Knowledge base about the portfolio owner
  const knowledgeBase = {
    skills: {
      keywords: ['skills', 'technology', 'tech stack', 'tools', 'what can you do', 'abilities', 'expertise', 'proficient'],
      response: "I specialize in UI/UX Design with Figma, Adobe XD, and Sketch, Frontend Development using React, TypeScript, and Tailwind CSS, Interaction Design with Framer Motion and GSAP, and Performance Optimization. I'm passionate about creating beautiful, functional, and performant web experiences!"
    },
    experience: {
      keywords: ['experience', 'background', 'years', 'work history', 'career', 'professional'],
      response: "I'm a designer-developer hybrid with extensive experience in bridging aesthetics and functionality. I've worked on numerous projects ranging from e-commerce platforms to SaaS applications, always focusing on user-centric design and clean, maintainable code."
    },
    projects: {
      keywords: ['projects', 'portfolio', 'work', 'case studies', 'examples', 'built', 'created'],
      response: "I've built innovative projects including an E-commerce Platform with AR try-on features, a SaaS Dashboard with real-time analytics, a Mobile Banking App with biometric security, and a Social Media Platform with AI-powered content recommendations. Check out my Projects section for detailed case studies!"
    },
    contact: {
      keywords: ['contact', 'reach', 'email', 'hire', 'available', 'get in touch', 'connect'],
      response: "I'm currently available for new opportunities! You can reach me at hello@designer.dev or connect with me on LinkedIn, GitHub, or Dribbble. I'd love to discuss how I can contribute to your team!"
    },
    about: {
      keywords: ['who are you', 'tell me about', 'about you', 'introduce', 'yourself'],
      response: "I'm a passionate designer and frontend developer who loves creating innovative digital experiences. I combine creative design thinking with technical expertise to build products that users love. My approach is user-centered, detail-oriented, and always pushing the boundaries of what's possible!"
    },
    design: {
      keywords: ['design', 'ui', 'ux', 'interface', 'visual', 'aesthetics'],
      response: "Design is my passion! I specialize in creating intuitive, accessible, and visually stunning interfaces. I follow modern design principles, conduct user research, create design systems, and prototype interactions to ensure the best user experience possible."
    },
    code: {
      keywords: ['code', 'coding', 'programming', 'development', 'developer', 'frontend'],
      response: "I write clean, maintainable, and performant code. My tech stack includes React, TypeScript, Next.js, and Tailwind CSS. I'm experienced with modern development practices like component-driven development, testing, CI/CD, and responsive design."
    },
    collaboration: {
      keywords: ['team', 'collaborate', 'work with', 'communication', 'agile', 'remote'],
      response: "I'm a great team player! I have experience working in agile environments, collaborating with designers, developers, product managers, and stakeholders. I believe in clear communication, regular feedback, and building strong working relationships."
    },
    process: {
      keywords: ['process', 'workflow', 'approach', 'methodology', 'how do you work'],
      response: "My process starts with understanding user needs and business goals. Then I move through research, wireframing, prototyping, visual design, development, testing, and iteration. I believe in continuous improvement and data-driven decision making."
    },
    passion: {
      keywords: ['passion', 'love', 'enjoy', 'motivate', 'inspire', 'excited'],
      response: "I'm passionate about creating delightful user experiences that make people's lives easier! I love the challenge of solving complex problems with elegant solutions, staying up-to-date with the latest design and development trends, and mentoring others in the field."
    }
  };

  const quickPrompts = [
    "What are your skills?",
    "Tell me about your projects",
    "Are you available for hire?",
    "What's your design process?"
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check each category in knowledge base
    for (const [, category] of Object.entries(knowledgeBase)) {
      if (category.keywords.some(keyword => lowerMessage.includes(keyword))) {
        return category.response;
      }
    }

    // Greetings
    if (lowerMessage.match(/^(hi|hello|hey|greetings|good morning|good afternoon|good evening)/)) {
      return "Hello! 👋 I'm here to answer any questions about my skills, projects, experience, or availability. What would you like to know?";
    }

    // Thank you
    if (lowerMessage.match(/(thank|thanks|appreciate)/)) {
      return "You're welcome! Feel free to ask me anything else. I'm here to help! 😊";
    }

    // Default response
    return "That's an interesting question! While I'm still learning, I'd be happy to tell you about my skills, projects, experience, or how I can help your team. You can also reach out directly through the contact form below!";
  };

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(messageText),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full shadow-2xl flex items-center justify-center z-50 group"
          >
            <Bot className="w-8 h-8 text-white" />
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 blur-xl opacity-50"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            {/* Notification Badge */}
            <motion.div
              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Sparkles className="w-3 h-3 text-white" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-slate-200"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  <Bot className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-white">AI Assistant</h3>
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-2 h-2 bg-green-400 rounded-full"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [1, 0.5, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                    <span className="text-white/90 text-sm">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Prompts */}
            {messages.length <= 1 && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-slate-50 border-b border-slate-200"
              >
                <p className="text-slate-600 text-sm mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickPrompts.map((prompt, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSendMessage(prompt)}
                      className="px-3 py-1.5 bg-white text-slate-700 rounded-full text-sm border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all"
                    >
                      {prompt}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${message.isBot ? '' : 'flex-row-reverse'}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.isBot 
                      ? 'bg-gradient-to-br from-indigo-500 to-purple-600' 
                      : 'bg-slate-200'
                  }`}>
                    {message.isBot ? (
                      <Bot className="w-5 h-5 text-white" />
                    ) : (
                      <User className="w-5 h-5 text-slate-600" />
                    )}
                  </div>
                  <div className={`flex-1 ${message.isBot ? '' : 'flex justify-end'}`}>
                    <div className={`inline-block px-4 py-2 rounded-2xl ${
                      message.isBot
                        ? 'bg-slate-100 text-slate-800'
                        : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-slate-100 px-4 py-3 rounded-2xl">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-slate-400 rounded-full"
                          animate={{
                            y: [0, -8, 0],
                          }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-200 bg-white">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={isListening ? "Listening..." : "Ask me anything..."}
                    className="w-full px-4 py-3 pr-12 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-800 placeholder-slate-400"
                  />
                  {recognitionRef.current && (
                    <button
                      onClick={toggleVoiceInput}
                      className={`absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-colors ${
                        isListening
                          ? 'bg-red-500 text-white'
                          : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </button>
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim()}
                  className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-shadow"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
