import React, { useState, useEffect } from "react";

function StudentForm() {
    const [searchCode, setSearchCode] = useState('');
    const [activityInfo, setActivityInfo] = useState(null);
    const [msg, setMsg] = useState('');
    const [feedbackMsg, setFeedbackMsg] = useState('');
    const [timeLeft, setTimeLeft] = useState(null); // For countdown

    const handleSearch = async () => {
        if (!searchCode) {
            setMsg('Please enter a valid access code');
            return;
        }

        try {
            const response = await fetch('https://webtechdevproject.onrender.com/getActivity', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ accessCode: searchCode }),
            });

            const data = await response.json();

            if (response.ok) {
                setActivityInfo(data.activity);
                setTimeLeft(data.activity.time); // Initialize countdown
                setMsg('');
            } else {
                setMsg(data.message);
                setActivityInfo(null);
                setTimeLeft(null);
            }
        } catch (error) {
            setMsg('Server error!');
        }
    };

    // Countdown logic
    useEffect(() => {
        if (timeLeft === null || timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const playSound = (soundFile) => {
        const audio = new Audio(soundFile);
        audio.volume=0.1;
        audio.play();
    };

    const sendFeedback = async (reaction) => {
        let soundFile = '';

        switch (reaction) {
            case 'smiley':
                soundFile = 'assets/smiley.mp3';
                break;
            case 'frowny':
                soundFile = 'assets/frowny.mp3';
                break;
            case 'surprised':
                soundFile = 'assets/surprised.mp3';
                break;
            case 'confused':
                soundFile = 'assets/confused.mp3';
                break;
            default:
                break;
        }

        // Play the sound
        playSound(soundFile);

        try {
            const response = await fetch('https://webtechdevproject.onrender.com/sendFeedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code: searchCode, reaction }),
            });

            const data = await response.json();

            if (response.ok) {
                setFeedbackMsg(`Feedback sent: ${reaction}`);
            } else {
                setFeedbackMsg(data.message);
            }
        } catch (error) {
            setFeedbackMsg('Server error while sending feedback!');
        }
    };

    return (
        <div className="boxStudent">
            {!activityInfo ? (
                <>
                    <h1 className="h1_design">Welcome Student</h1>
                    <div className="search_box">
                        <label htmlFor="scode" id="search_label">Search by code:</label>
                        <input
                            type="number"
                            id="code"
                            name="scode"
                            value={searchCode}
                            onChange={(e) => setSearchCode(e.target.value)}
                        />
                        <button
                            name="SaveBtnStudent"
                            id="savebtnstudent"
                            onClick={handleSearch}
                        >
                            Search
                        </button>
                    </div>
                    {msg && <div>{msg}</div>}
                </>
            ) : (
                <div className="activitydetails">
                    <h1>Activity Details</h1>
                    <p><strong>Activity Name:</strong> {activityInfo.activity}</p>
                    <p><strong>Date:</strong> {activityInfo.date}</p>
                    <p><strong>Time Remaining:</strong> {timeLeft > 0 ? formatTime(timeLeft) : 'Time is up!'}</p>

                    <h2>React to the activity:</h2>
                    <div className="feedback-grid">
                        <div className="quadrant" onClick={() => sendFeedback('smiley')}>
                            <img
                                alt="Smiley"
                                src="assets/smiley.png"
                                className="feedback-image">
                            </img>
                        </div>
                        <div className="quadrant" onClick={() => sendFeedback('frowny')}>
                            <img
                                alt="Frowny"
                                src="assets/frowny.gif"
                                className="feedback-image">
                            </img>
                        </div>
                        <div className="quadrant" onClick={() => sendFeedback('surprised')}>
                            <img
                                alt="Surprised"
                                src="assets/surprised.gif"
                                className="feedback-image">
                            </img>
                        </div>
                        <div className="quadrant" onClick={() => sendFeedback('confused')}>
                            <img
                                alt="Confused"
                                src="assets/confused.gif"
                                className="feedback-image">
                            </img>
                        </div>
                    </div>
                    {feedbackMsg && <div>{feedbackMsg}</div>}
                </div>
            )}
        </div>
    );
}

export default StudentForm;
