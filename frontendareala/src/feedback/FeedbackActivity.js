import React, { useState } from "react";

function FeedbackActivity({ activityInfo }) {
    const [feedback, setFeedback] = useState([]);
    const [msg, setMsg] = useState('');

    const sendFeedback = async (emotion) => {
        try {
            const response = await fetch('https://webtechdevproject.onrender.com/sendFeedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ activityId: activityInfo.id, emotion }),
            });

            const data = await response.json();

            if (response.ok) {
                setFeedback((prevFeedback) => [...prevFeedback, emotion]);
                setMsg('Feedback sent successfully!');
            } else {
                setMsg(data.message);
            }
        } catch (error) {
            setMsg('Server error! Could not send feedback.');
        }
    };

    return (
        <div className="feedback-container">
            <h1>Activity Feedback</h1>
            <div className="quadrants">
                <div className="quadrant" onClick={() => sendFeedback('happy')}>
                    😊
                    <p>Happy</p>
                </div>
                <div className="quadrant" onClick={() => sendFeedback('sad')}>
                    😢
                    <p>Sad</p>
                </div>
                <div className="quadrant" onClick={() => sendFeedback('surprised')}>
                    😮
                    <p>Surprised</p>
                </div>
                <div className="quadrant" onClick={() => sendFeedback('confused')}>
                    😕
                    <p>Confused</p>
                </div>
            </div>
            {msg && <div>{msg}</div>}
            <h2>Your Feedback:</h2>
            <ul>
                {feedback.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

export default FeedbackActivity;
