import React, { useState } from 'react';
import { MessageCircle, X, Send, ChevronDown, ChevronUp } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: '1',
    text: "Hello! 👋 I'm your BikeWash assistant. How can I help you today?",
    sender: 'bot',
    timestamp: new Date()
  }
];

const suggestionButtons = [
  { id: '1', text: 'Service Issues' },
  { id: '2', text: 'Payment Problems' },
  { id: '3', text: 'Booking Help' },
  { id: '4', text: 'Contact Support' }
];

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSuggestionClick = (suggestion: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: suggestion,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    simulateBotResponse(suggestion);
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    simulateBotResponse(inputText);
  };

  const simulateBotResponse = (userInput: string) => {
    setIsTyping(true);
    
    // Simulate bot thinking time
    setTimeout(() => {
      let botResponse = '';
      
      // Simple response logic based on keywords
      const input = userInput.toLowerCase();
      if (input.includes('payment') || input.includes('pay')) {
        botResponse = "For payment issues, please check if your payment method is valid. If you're still having trouble, I can connect you with our payment support team.";
      } else if (input.includes('book') || input.includes('scheduling')) {
        botResponse = "To book a service, please use our booking form in the dashboard. Make sure you're logged in first. Need help with the booking process?";
      } else if (input.includes('service') || input.includes('wash')) {
        botResponse = "We offer various bike washing services including pickup & drop. Would you like to know more about our service packages?";
      } else if (input.includes('contact') || input.includes('support')) {
        botResponse = "You can reach our support team at support@bikewash.com or call us at +1 (555) 123-4567 during business hours.";
      } else {
        botResponse = "I understand you need help. Could you please specify if it's about booking, payments, or service issues?";
      }

      const botMessage: Message = {
        id: Date.now().toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const toggleChat = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsMinimized(false);
    } else {
      setIsMinimized(!isMinimized);
    }
  };

  const closeChat = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg transition-colors duration-200"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={twMerge(
          "bg-white rounded-lg shadow-xl transition-all duration-300 ease-in-out",
          isMinimized ? "h-[60px]" : "h-[500px]",
          "w-[350px] flex flex-col"
        )}>
          {/* Header */}
          <div className="flex items-center justify-between bg-blue-500 text-white p-4 rounded-t-lg">
            <div className="flex items-center">
              <MessageCircle className="h-6 w-6 mr-2" />
              <h3 className="font-semibold">Customer Support</h3>
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={toggleChat} className="hover:bg-blue-600 rounded p-1">
                {isMinimized ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
              <button onClick={closeChat} className="hover:bg-blue-600 rounded p-1">
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={twMerge(
                      "max-w-[80%] p-3 rounded-lg",
                      message.sender === 'user'
                        ? "bg-blue-500 text-white ml-auto rounded-br-none"
                        : "bg-gray-100 text-gray-800 rounded-bl-none"
                    )}
                  >
                    {message.text}
                    <div
                      className={twMerge(
                        "text-xs mt-1",
                        message.sender === 'user' ? "text-blue-100" : "text-gray-500"
                      )}
                    >
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex items-center space-x-2 text-gray-500">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Suggestion Buttons */}
              <div className="p-4 border-t">
                <div className="flex flex-wrap gap-2">
                  {suggestionButtons.map((button) => (
                    <button
                      key={button.id}
                      onClick={() => handleSuggestionClick(button.text)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm transition-colors duration-200"
                    >
                      {button.text}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <div className="p-4 border-t">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputText.trim()}
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 transition-colors duration-200 disabled:opacity-50"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Chatbot;