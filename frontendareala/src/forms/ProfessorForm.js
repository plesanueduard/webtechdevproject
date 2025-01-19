import React, { useState } from "react";
import ProfessorFeedback from "../feedback/ProfessorFeedback.js";

function ProfessorForm() {
    const [activity, setActivity] = useState('');
    const [date, setDate] = useState('');
    const [accessCode, setAccessCode] = useState('');
    const [time, setTime] = useState('');
    const [msg, setMsg] = useState('');

    const handleSave = async () => {
        if (!activity || !date || !accessCode || !time) {
            setMsg('All fields are required!');
            return;
        }

        try {
            const response = await fetch('https://webtechdevproject.onrender.com/saveActivity', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ activity, date, accessCode, time }),
            });

            const data = await response.json();
            setMsg(data.message);
        } catch (error) {
            setMsg('Server error!');
        }
    };

    return (
        <div className="boxTeacher">
            <h1 class="h1_design">Welcome Teacher</h1>

            <ProfessorFeedback />

            <div className="create_activity_box">
                <h2 id="create_activity">Create New Activity</h2>
                <label htmlFor="factivity">Activity:</label>
                <input
                    type="text"
                    id="activity"
                    name="factivity"
                    value={activity}
                    onChange={(e) => setActivity(e.target.value)}
                />
                <label htmlFor="fdate">Date:</label>
                <input
                    type="date"
                    id="date"
                    name="fdate"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <label htmlFor="faccess">Access Code:</label>
                <input
                    type="number"
                    id="numbers"
                    name="faccess"
                    placeholder="1000-9999"
                    min="1000"
                    max="9999"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                />
                <label htmlFor="ftime">Time:</label>
                <input
                    type="number"
                    id="numbers"
                    name="ftime"
                    placeholder="60-7800s"
                    min="60"
                    max="7800"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />
                <button name="SaveBtnTeacher" id="savebtnteacher" onClick={handleSave}>
                    Save
                </button>
                <div>{msg}</div>
            </div>
        </div>
    );
}

export default ProfessorForm;
