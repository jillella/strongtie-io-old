'use client'
import Image from "next/image";
// import styles from "./page.module.css";
import "./page.css";
import { useState } from "react";
export default function Home() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      const response = await fetch('/api/send-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })

      if (response.ok) {
        setSubmitMessage('Thank you for your feedback!')
        setName('')
        setEmail('')
        setMessage('')
      } else {
        throw new Error('Failed to send feedback')
      }
    } catch (error) {
      setSubmitMessage('Failed to send feedback. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="page">
      <main className="main">
        <div className="formContainer">
          <h1 className="title">Feedback Form</h1>
          <form onSubmit={handleSubmit} className="form">
            <div className="formGroup">
              <label htmlFor="name" className="label">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="input"
              />
            </div>
            <div className="formGroup">
              <label htmlFor="email" className="label">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input"
              />
            </div>
            <div className="formGroup">
              <label htmlFor="message" className="label">Message</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="textarea"
              />
            </div>
            <button type="submit" disabled={isSubmitting} className="button">
              {isSubmitting ? 'Sending...' : 'Send Feedback'}
            </button>
          </form>
          {submitMessage && <p className="submitMessage">{submitMessage}</p>}
        </div>
      </main>
      <footer className="footer">
        <span>© 2024 Simpson Strong-Tie Company, Inc.</span>
      </footer>
    </div>
  );
}
