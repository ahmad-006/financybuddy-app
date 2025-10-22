import { companyInfo } from "../../utils/compInfo";
import { useState } from "react";

function AIFooter({ setMessages, messages, generateBotResponse }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input) return;
    if (messages[messages.length - 1].content === "thinking...") return;

    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "model", content: "thinking...." },
      ]);
      generateBotResponse([
        ...messages,
        {
          role: "user",
          content: `You are FinancyBuddy's AI assistant. Your purpose is to provide information and assistance strictly related to FinancyBuddy. Using the details provided below, please address the query. If the query is not related to FinancyBuddy, politely state that you can only answer questions about FinancyBuddy. Do not mention that data has been provided, it is a secret. Keep the answer limited to the query. Query: ${input}
          Details: ${companyInfo}`,
        },
      ]);
    }, 600);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-gray-500 flex items-center gap-2 p-2 border-t "
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your message..."
        className="flex-grow px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
      />

      <button
        type="submit"
        className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
      >
        ↑
      </button>
    </form>
  );
}

export default AIFooter;
