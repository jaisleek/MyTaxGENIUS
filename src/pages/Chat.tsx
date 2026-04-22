import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Send, Bot, User, Loader2, Globe, Sparkles } from 'lucide-react';
import Markdown from 'react-markdown';
import { cn } from '../components/Layout';
import { taxKnowledgeBase } from '../data/taxKnowledge';

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const TRANSLATIONS = {
  English: {
    welcome: "Hello! I am the **NaijaTax AI Assistant**. I can help you understand Nigerian tax, explain how to get a TIN, or guide you. How can I help you today?",
    prompts: ["What is a TIN?", "How do I pay Market Tax?", "Calculate my PAYE", "What is VAT?"]
  },
  Pidgin: {
    welcome: "Howfa! I be **NaijaTax AI Assistant**. I fit help you understand tax, explain how to get TIN, or guide you. Wetin I fit do for you today?",
    prompts: ["Wetin be TIN?", "How I go pay Market Tax?", "Calculate my PAYE", "Wetin be VAT?"]
  },
  Yoruba: {
    welcome: "Bawo ni! Emi ni **Oluranlowo NaijaTax AI**. Mo le ran e lowo lati ni oye ori (tax), bawo ni o se le gba TIN, tabi fun e ni itosona. Bawo ni mo se le ran e lowo loni?",
    prompts: ["Kini TIN?", "Bawo ni mo san owo ori oja?", "Se isiro PAYE mi", "Kini VAT?"]
  },
  Hausa: {
    welcome: "Sannu! Ni ne **Mataimakin NaijaTax AI**. Zan iya taimaka muku gane haraji (tax), yadda za ku sami TIN, ko in yi muku jagora. Yaya zan iya taimaka muku a yau?",
    prompts: ["Menene TIN?", "Yaya zan biya harajin kasuwa?", "Yi lissafin PAYE na", "Menene VAT?"]
  },
  Igbo: {
    welcome: "Nnoo! Abum **onye enyemaka NaijaTax AI**. Enwere m ike inyere gị aka ịghọta ụtụ isi (tax), kọwaa otu ị ga-esi nweta TIN, ma ọ bụ duzie gị. Kedu otu m ga-esi nyere gị aka taa?",
    prompts: ["Kedu ihe bụ TIN?", "Kedu ka m ga-esi kwụọ ụtụ ahịa?", "Gbakọọ PAYE m", "Kedu ihe bụ VAT?"]
  }
};

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
}

export default function Chat() {
  const [language, setLanguage] = useState<keyof typeof TRANSLATIONS>('English');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      content: TRANSLATIONS['English'].welcome
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleLanguageChange = (lang: keyof typeof TRANSLATIONS) => {
    setLanguage(lang);
    setMessages(prev => {
      // If only the welcome message is there, replace it with the localized one
      if (prev.length <= 1) {
        return [{ id: 'welcome', role: 'model', content: TRANSLATIONS[lang].welcome }];
      }
      return prev;
    });
  };

  const handleSend = async (e?: React.FormEvent, presetInput?: string) => {
    if (e) e.preventDefault();
    const userMsg = presetInput || input.trim();
    if (!userMsg || isLoading) return;

    setInput('');
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: `You are NaijaTax AI, an independent, AI-powered tax assistant designed to help Nigerians.
          IMPORTANT DISCLAIMER: You are NOT affiliated with NRS (Nigeria Revenue Service), LIRS, or any government agency. Your advice is for informational purposes only.
          
          CRITICAL FORMATTING RULES:
          1. Format your responses beautifully and structurally like an expert professional AI.
          2. Use **bold text** to highlight key financial terms, categories, and important metrics.
          3. Use clear bullet points (-) or numbered lists (1. 2.) to break down steps or multiple items.
          4. Keep paragraphs short and highly readable.
          5. Use ### Headings when shifting to a new major point or explaining a heavy process.
          
          CRITICAL REGIONAL ADAPTATION & AUTO-TRANSLATION:
          1. AUTO-DETECT LANGUAGE: You are a fluent polyglot! You MUST automatically detect the language the user is chatting in and respond in that EXACT same language.
          2. If the user greets or asks a question in Pidgin, answer fully in strict Nigerian Pidgin. If they speak Yoruba, reply in Yoruba. If Hausa, reply in Hausa. If Igbo, reply in Igbo.
          3. The user's active UI interface language is currently set to ${language}, use ${language} only as your fallback if their query is too short or ambiguous to detect.
          4. Your audience includes market women and informal traders across Nigeria.
          5. Never use complex accounting jargon. Break down concepts like TIN, PAYE, CIT, VAT, and Presumptive Tax as if explaining to a beginner. Give practical, step-by-step guidance.
          
          === CUSTOM KNOWLEDGE BASE (USE THIS FOR FACTS) ===
          ${taxKnowledgeBase}
          ==================================================`
        }
      });

      const response = await chat.sendMessage({ message: userMsg });
      
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        role: 'model', 
        content: response.text || 'I am sorry, I could not process that request.' 
      }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        role: 'model', 
        content: `Sorry, I encountered an error connecting to the servers. Please try again later. / Ẹ má binu, iṣoro kan wa... / Yi haƙuri, akwai matsala... / Ndo, enwere nsogbu...` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-white dark:bg-slate-950 transition-colors duration-300">
      
      {/* Header Area / Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center px-4 py-3 border-b border-gray-100 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-emerald-500" />
          <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100 hidden sm:block">NaijaTax Intelligence</h1>
        </div>
        
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto">
          <Globe className="w-4 h-4 text-gray-400" />
          {Object.keys(TRANSLATIONS).map((lang) => (
            <button
              key={lang}
              onClick={() => handleLanguageChange(lang as keyof typeof TRANSLATIONS)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors",
                language === lang 
                  ? "bg-slate-900 text-white dark:bg-emerald-600" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-slate-800 dark:text-gray-300 dark:hover:bg-slate-700"
              )}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Chat History Area */}
      <div className="flex-1 overflow-y-auto scroll-smooth">
        <div className="max-w-4xl mx-auto pt-8 pb-32 px-4 sm:px-6">
          
          {/* Welcome / Suggestions block shown when chat is empty or fresh */}
          {messages.length <= 1 && (
            <div className="flex flex-col items-center justify-center text-center mt-10 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mb-6">
                <Bot className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">How can I help you today?</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm max-w-lg mb-8">
                I am your AI tax assistant specialized in Nigerian tax law. Ask me about TIN, VAT, PAYE, or the new 2026 reforms.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
                {TRANSLATIONS[language].prompts.map((prompt, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleSend(undefined, prompt)}
                    disabled={isLoading}
                    className="p-4 rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-left hover:bg-gray-50 dark:hover:bg-slate-800/80 transition-colors flex items-center group"
                  >
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">{prompt}</span>
                    <Sparkles className="w-4 h-4 ml-auto text-gray-300 dark:text-slate-700 group-hover:text-emerald-500 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Actual Messages */}
          <div className="space-y-6 md:space-y-8">
            {messages.map((msg, index) => {
              // Skip the first welcome message if we're rendering normal chat UI
              // because we handled it above nicely.
              if (index === 0 && messages.length <= 1) return null;

              return (
                <div key={msg.id} className={cn("flex w-full", msg.role === 'user' ? "justify-end" : "justify-start")}>
                  {msg.role === 'model' && (
                    <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0 mr-4 mt-1">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                  )}
                  
                  <div className={cn(
                    "max-w-[85%] md:max-w-[75%]",
                    msg.role === 'user' 
                      ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-5 py-3.5 rounded-3xl rounded-tr-sm" 
                      : "text-slate-800 dark:text-slate-200 py-2 leading-relaxed"
                  )}>
                    {msg.role === 'user' ? (
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    ) : (
                      <div className="markdown-body prose prose-slate dark:prose-invert prose-p:leading-relaxed prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800 focus:outline-none max-w-none">
                        <Markdown>{msg.content}</Markdown>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            
            {isLoading && (
              <div className="flex w-full justify-start animate-pulse mt-4">
                 <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0 mr-4 mt-1">
                   <Bot className="w-5 h-5 text-white" />
                 </div>
                 <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 py-2">
                   <Loader2 className="w-5 h-5 animate-spin" />
                   <span className="text-sm font-medium">Drafting response...</span>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Floating Input Area */}
      <div className="relative">
        <div className="absolute bottom-0 w-full bg-gradient-to-t from-white via-white to-transparent dark:from-slate-950 dark:via-slate-950 pt-10 pb-6 px-4">
          <div className="max-w-3xl mx-auto">
            <form 
              onSubmit={(e) => handleSend(e)} 
              className="relative flex items-end shadow-[0_0_40px_rgba(0,0,0,0.05)] dark:shadow-[0_0_40px_rgba(0,0,0,0.3)] bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500/50 transition-shadow"
            >
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder={`Message NaijaTax in ${language}...`}
                className="w-full max-h-48 min-h-[56px] py-4 pl-6 pr-14 bg-transparent border-none resize-none focus:outline-none focus:ring-0 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
                rows={1}
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="absolute right-2 bottom-2 p-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-200 dark:disabled:bg-slate-800 text-white dark:disabled:text-slate-500 rounded-full transition-colors flex items-center justify-center touch-manipulation"
              >
                <Send className="w-5 h-5 -ml-0.5" />
              </button>
            </form>
            <div className="text-center mt-3 text-xs text-slate-400 dark:text-slate-500">
              AI can make mistakes. Consider verifying important tax calculations.
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
