"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Phone, Mail, User, Bot, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { chatKnowledge } from "@/lib/chat-knowledge";
import { cn } from "@/lib/utils";

type Message = {
    id: string;
    text: string;
    sender: "user" | "bot";
    timestamp: Date;
};

interface FloatingContactProps {
    dict: any;
    lang: string;
}

export function FloatingContact({ dict, lang }: FloatingContactProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            text: dict.chat.welcome,
            sender: "bot",
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Update welcome message if language changes
    useEffect(() => {
        setMessages(prev => {
            if (prev.length === 1 && prev[0].id === "welcome") {
                return [{
                    ...prev[0],
                    text: dict.chat.welcome
                }];
            }
            return prev;
        });
    }, [lang, dict.chat.welcome]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSendMessage = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: "user",
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue("");
        setIsTyping(true);

        // AI Logic
        setTimeout(() => {
            const lowerInput = userMsg.text.toLowerCase();
            let responseText = dict.chat.default_answer;

            const knowledge = chatKnowledge[lang as keyof typeof chatKnowledge] || chatKnowledge.ro;

            for (const entry of knowledge) {
                if (entry.keywords.some(keyword => lowerInput.includes(keyword))) {
                    responseText = entry.answer;
                    break;
                }
            }

            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: responseText,
                sender: "bot",
                timestamp: new Date()
            };

            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 1000);
    };

    return (
        <>
            {/* Floating Actions Group */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4 items-end">

                {/* Quick Contact Buttons */}
                <AnimatePresence>
                    {!isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="flex flex-col gap-3"
                        >
                            <a
                                href="https://wa.me/4915750123117"
                                target="_blank"
                                rel="noreferrer"
                                className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-lg shadow-green-900/20 hover:scale-110 transition-transform cursor-pointer"
                                title="WhatsApp"
                            >
                                <Phone className="w-5 h-5 fill-current" />
                            </a>
                            <a
                                href="mailto:contact@monalisabiohacking.com"
                                className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer"
                                title="Email"
                            >
                                <Mail className="w-5 h-5" />
                            </a>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main Omni-Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                        "w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 relative",
                        isOpen ? "bg-zinc-800 text-white rotate-90" : "bg-primary text-black hover:scale-105 hover:bg-emerald-400"
                    )}
                >
                    {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-7 h-7" />}

                    {!isOpen && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-background animate-pulse" />
                    )}
                </button>
            </div>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
                        className="fixed bottom-24 right-6 w-[90vw] md:w-[380px] h-[500px] max-h-[70vh] bg-zinc-900/95 backdrop-blur-md border border-zinc-700 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-zinc-800 p-4 border-b border-zinc-700 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                <div>
                                    <h3 className="font-bold text-white text-sm">{dict.chat.assistant_name}</h3>
                                    <p className="text-xs text-zinc-400">{dict.chat.status}</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <a href="https://wa.me/4915750123117" className="p-2 hover:bg-zinc-700 rounded-full text-zinc-400 hover:text-green-500 transition-colors">
                                    <Phone className="w-4 h-4" />
                                </a>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={cn(
                                        "flex gap-3 max-w-[85%]",
                                        msg.sender === "user" ? "ml-auto flex-row-reverse" : ""
                                    )}
                                >
                                    <div className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border",
                                        msg.sender === "user" ? "bg-primary text-black border-primary" : "bg-zinc-800 text-primary border-zinc-700"
                                    )}>
                                        {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                    </div>

                                    <div className={cn(
                                        "p-3 rounded-2xl text-sm",
                                        msg.sender === "user"
                                            ? "bg-primary text-black rounded-tr-none"
                                            : "bg-zinc-800 text-zinc-200 rounded-tl-none border border-zinc-700"
                                    )}>
                                        {msg.text}
                                        <p className="text-[10px] opacity-50 mt-1 text-right">
                                            {msg.timestamp.toLocaleTimeString(lang, { hour: "2-digit", minute: "2-digit" })}
                                        </p>
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center shrink-0 border border-zinc-700">
                                        <Bot className="w-4 h-4 text-primary" />
                                    </div>
                                    <div className="bg-zinc-800 border border-zinc-700 p-3 rounded-2xl rounded-tl-none flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                        <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                        <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSendMessage} className="p-3 bg-zinc-800 border-t border-zinc-700 flex gap-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder={dict.chat.placeholder}
                                className="flex-1 bg-zinc-900 border border-zinc-600 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 placeholder:text-zinc-600"
                            />
                            <button
                                type="submit"
                                disabled={!inputValue.trim()}
                                className="p-2 bg-primary text-black rounded-xl hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
