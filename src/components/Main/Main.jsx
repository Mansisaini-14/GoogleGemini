import React, { useState } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { generateResponse } from '../../config/gemini.js'

const Main = () => {
    const [prompt, setPrompt] = useState('')
    const [messages, setMessages] = useState([
        { role: 'assistant', text: 'Ask me anything and I’ll help you with a thoughtful response.' }
    ])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const suggestions = [
        'Suggest beautiful places to see on an upcoming road trip',
        'Briefly summarize this concept: urban planning',
        'Brainstorm team bonding activities for our work retreat',
        'Improve the readability of the following code'
    ]

    const handleSend = async () => {
        const trimmedPrompt = prompt.trim()
        if (!trimmedPrompt) return

        setLoading(true)
        setError(null)

        setMessages(prev => [...prev, { role: 'user', text: trimmedPrompt }])
        setPrompt('')

        try {
            const answer = await generateResponse(trimmedPrompt)
            setMessages(prev => [...prev, { role: 'assistant', text: answer }])
        } catch (err) {
            console.error(err)
            setError('Unable to generate a response. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = event => {
        event.preventDefault() 
        handleSend()
    }

    const handleSuggestionClick = suggestion => {
        setPrompt(suggestion)
    }

    return (
        <div className='main'>
            <div className="nav">
                <p>ThinkBot</p>
                <img src={assets.user_icon} alt="User avatar" />
            </div>
            <div className="main-container">
                <div className="greet">
                    <p><span>Hello, I'm ThinkBot!</span></p>
                    <p>How can I assist you today?</p>
                </div>

                <div className="prompt-panel">
                    <div className="prompt-header">
                        <h2>Prompt</h2>
                        <p>Type a request and receive an instant answer.</p>
                    </div>
                    <div className="messages">
                        {messages.map((message, index) => (
                            <div key={index} className={`message ${message.role}`}>
                                <p>{message.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="cards">
                    {suggestions.map((suggestion, index) => (
                        <div key={index} className="card" onClick={() => handleSuggestionClick(suggestion)}>
                            <p>{suggestion}</p>
                            <img src={index === 0 ? assets.compass_icon : index === 1 ? assets.bulb_icon : index === 2 ? assets.message_icon : assets.code_icon} alt="Suggestion icon" />
                        </div>
                    ))}
                </div>

                <div className="main-bottom">
                    <form className="search-box" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={prompt}
                            onChange={e => setPrompt(e.target.value)}
                            placeholder='Enter a prompt here'
                        />
                        <div>
                            <img src={assets.gallery_icon} alt="Gallery action" />
                            <img src={assets.mic_icon} alt="Mic action" />
                            <button type="submit" className="send-button">
                                <img src={assets.send_icon} alt="Send prompt" />
                            </button>
                        </div>
                    </form>
                    {loading && <p className="main-status">Generating response...</p>}
                    {error && <p className="main-error">{error}</p>}
                    <p className="bottom-info">
                        ThinkBot may display inaccurate info, including about people, so double check its responses. Your privacy is important.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Main