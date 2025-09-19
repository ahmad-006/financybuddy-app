import Messages from "../components/aichat/Messages";
import AIFooter from "../components/aichat/AIFooter";
import AIHeader from "../components/aichat/AIHeader";
import { useState, useRef, useEffect } from "react";
import axios from "axios";

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
      const payload = history
        .filter((msg) => !msg.hideInChat)
        .map((msg) => ({
          role: msg.role,
          parts: [{ text: msg.content }],
        }));

      const response = await axios.post(
        import.meta.env.VITE_URL,
        {
          contents: [payload],
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-goog-api-key": import.meta.env.VITE_API,
          },
        }
      );

      const result =
        response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Server Issue";

      setMessages((prev) => {
        const updated = [...prev];
        updated.pop();
        return [...updated, { role: "model", content: result }];
      });
    } catch (error) {
      console.error("Gemini API error:", error.response?.data || error.message);

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
    <div className="h-screen w-full bg-gradient-to-bl from-gray-900 to-gray-800 flex md:items-center md:justify-center overflow-x-hidden">
      <div className="bg-gray-100 w-full max-w-full sm:h-screen md:w-2/3 lg:w-1/2 md:max-w-2xl md:h-[80%] flex flex-col rounded-lg shadow-lg overflow-hidden">
        <AIHeader />
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 relative">
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
