import React, { useState, useEffect } from "react";

function ProfessorFeedback() {
    const [feedback, setFeedback] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const response = await fetch('https://webtechdevproject.onrender.com/getAllFeedback');
                const data = await response.json();

                if (response.ok) {
                    setFeedback(data.feedback);
                } else {
                    setError(data.message || 'Failed to fetch feedback');
                }
            } catch (error) {
                setError('Error fetching feedback');
            } finally {
                setLoading(false);
            }
        };

        fetchFeedback();
    }, []);

    const renderReaction = (reaction) => {
        switch (reaction) {
            case 'confused':
                return <span>😵‍💫 Confused</span>;
            case 'frowny':
                return <span>☹️ Frowny</span>;
            case 'surprised':
                return <span>😮 Surprised</span>;
            case 'smiley':
                return <span>😊 Smiley</span>;
        }
    };


    return (
        <div className="feedback-view">
            <h1 id="all_feedback">All Feedback</h1>
            {loading ? (
                <p>Loading feedback...</p>
            ) : error ? (
                <p>{error}</p>
            ) : feedback.length === 0 ? (
                <p>No feedback available.</p>
            ) : (
                <ul>
                    {feedback.map((item, index) => (
                        <li key={index}>
                            <strong>Activity Code:</strong> {item.activity_code} <br />
                            <strong>Reaction:</strong> {renderReaction(item.reaction)} <br />
                            <strong>Time:</strong> {new Date(item.created_at).toLocaleString()}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ProfessorFeedback;
