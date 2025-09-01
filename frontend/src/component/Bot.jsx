import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { FaUserCircle, FaRobot } from 'react-icons/fa'

function Bot() {
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)
    const messagesEndRef = useRef(null)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages])

    const handleSendMessage = async () => {
        setLoading(true);
        if (!input.trim()) return;
        try {
            const res = await axios.post("http://localhost:4002/bot/v1/message", { text: input })
            if (res.status === 200) {
                setMessages([
                    ...messages,
                    { text: res.data.userMessage, sender: 'user' },
                    { text: res.data.botMessage, sender: 'bot' }
                ]);
            }
        } catch (error) {
            console.log("Error sending message:", error);
        }
        setInput("");
        setLoading(false);
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSendMessage()
    }

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
            {/* Navbar */}
            <header className="fixed top-0 left-0 w-full bg-gray-900 border-b border-gray-700 z-10 shadow-md">
                <div className="container mx-auto flex justify-between items-center px-6 py-4">
                    <h1 className="text-2xl font-bold text-green-500 tracking-wide">Prepzy</h1>
                    <FaUserCircle size={30} className="cursor-pointer text-gray-300 hover:text-white transition-colors" />
                </div>
            </header>

            {/* Chat Area */}
            <main className="flex-1 overflow-y-auto pt-24 pb-28 px-4">
                <div className="max-w-3xl mx-auto flex flex-col space-y-4">
                    {messages.length === 0 ? (
                        <div className="text-center text-gray-400 text-lg animate-pulse">
                            👋 Hi, I'm <span className="text-green-500 font-semibold">Prepzy</span>. Ask me anything!
                        </div>
                    ) : (
                        <>
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex items-start max-w-[70%] p-3 rounded-2xl shadow-md ${
                                        msg.sender === 'user' ? 'self-end bg-blue-600 text-white' : 'self-start bg-gray-800 text-gray-100'
                                    }`}
                                >
                                    {msg.sender === 'bot' && <FaRobot className="mr-2 mt-1 text-green-400" />}
                                    <span>{msg.text}</span>
                                </div>
                            ))}

                            {loading && (
                                <div className="flex items-start max-w-[65%] p-3 rounded-2xl shadow-md bg-gray-700 text-gray-300 animate-pulse">
                                    <FaRobot className="mr-2 mt-1 text-green-400" /> Bot is typing...
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </>
                    )}
                </div>
            </main>

            {/* Input Footer */}
            <footer className="fixed bottom-0 left-0 w-full bg-gray-900 border-t border-gray-700 z-10 shadow-inner">
                <div className="max-w-3xl mx-auto flex justify-center px-4 py-4">
                    <div className="w-full flex bg-gray-800 rounded-full px-4 py-2 shadow-lg border border-gray-700">
                        <input
                            type="text"
                            placeholder="Ask Prepzy..."
                            className="flex-1 bg-transparent outline-none text-white placeholder-gray-400 px-2"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                        />
                        <button
                            onClick={handleSendMessage}
                            className="ml-3 bg-green-500 hover:bg-green-600 px-5 py-2 rounded-full text-white font-medium transition-colors shadow-md"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Bot
