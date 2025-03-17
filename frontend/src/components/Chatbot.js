import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './Chatbot.css';

function Chatbot() {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [streamMode, setStreamMode] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!message.trim()) return;

        setIsLoading(true);
        setResponse(''); // Clear previous response while loading

        try {
            if (streamMode) {
                // Stream mode implementation
                const response = await fetch(`/stream?message=${encodeURIComponent(message)}`);

                const reader = response.body.getReader();
                const decoder = new TextDecoder();
                let accumulatedResponse = '';

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    const chunk = decoder.decode(value, { stream: true });
                    accumulatedResponse += chunk;
                    setResponse(accumulatedResponse);
                }
            } else {
                // Regular mode implementation
                const response = await fetch('/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({ message })
                });

                const data = await response.text();
                setResponse(data);
            }
        } catch (error) {
            console.error('Error:', error);
            setResponse(`Error: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="chatbot-container">
            <h1>AI Chatbot</h1>

            <form onSubmit={handleSubmit} className="chatbot-form">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                    className="chatbot-input"
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    className="chatbot-button"
                    disabled={isLoading}
                >
                    {isLoading ? 'Sending...' : 'Send'}
                </button>
            </form>

            <div className="stream-toggle">
                <label>
                    <input
                        type="checkbox"
                        checked={streamMode}
                        onChange={(e) => setStreamMode(e.target.checked)}
                        disabled={isLoading}
                    />
                    Respond as Stream
                </label>
            </div>

            {isLoading && (
                <div className="loading-container">
                    <div className="spinner"></div>
                </div>
            )}

            {response && (
                <div className="chatbot-response">
                    <h2>Response:</h2>
                    <div className="markdown-content">
                        <ReactMarkdown
                            components={{
                                code({node, inline, className, children, ...props}) {
                                    const match = /language-(\w+)/.exec(className || '');
                                    return !inline && match ? (
                                        <SyntaxHighlighter
                                            style={atomDark}
                                            language={match[1]}
                                            PreTag="div"
                                            {...props}
                                        >
                                            {String(children).replace(/\n$/, '')}
                                        </SyntaxHighlighter>
                                    ) : (
                                        <code className={className} {...props}>
                                            {children}
                                        </code>
                                    )
                                }
                            }}
                        >
                            {response}
                        </ReactMarkdown>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Chatbot;