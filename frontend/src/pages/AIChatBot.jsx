import Messages from "../components/aichat/Messages";
import AIFooter from "../components/aichat/AIFooter";
import AIHeader from "../components/aichat/AIHeader";
import { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

function AIChatBot() {
  const [messages, setMessages] = useState([
    { role: "model", content: "Hi there, How can I help you" },
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const generateBotResponse = async (history) => {
    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const formattedHistory = history
        .filter((msg) => !msg.hideInChat)
        .map((msg) => ({
          role: msg.role === "model" ? "model" : "user",
          parts: [{ text: msg.content }],
        }));

      const result = await model.generateContent({
        contents: formattedHistory,
      });

      const text = result.response.text();

      setMessages((prev) => {
        const updated = [...prev];
        updated.pop();
        return [...updated, { role: "model", content: text }];
      });
    } catch (error) {
      console.error("Gemini API error:", error);

      setMessages((prev) => {
        const updated = [...prev];
        updated.pop();
        return [
          ...updated,
          { role: "model", content: error.message || "⚠️Server Issue" },
        ];
      });
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-gray-50 to-white flex md:items-center md:justify-center overflow-hidden">
      <div className="bg-white w-full max-w-full sm:h-screen md:w-2/3 lg:w-1/2 md:max-w-2xl md:h-[85%] flex flex-col rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
        <AIHeader />
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 bg-gray-50">
          {messages.map((msg, index) => (
            <Messages msg={msg} key={index} />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <AIFooter
          setMessages={setMessages}
          messages={messages}
          generateBotResponse={generateBotResponse}
        />
      </div>
    </div>
  );
}

export default AIChatBot;
