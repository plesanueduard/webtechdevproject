import { useState } from "react";
import Login from "./Login.js";
import ProfessorForm from "../src/forms/ProfessorForm.js";
import StudentForm from "../src/forms/StudentForm.js";
import "./App.css"
import "./ProfDesign.css"
import "./StudentDesign.css"

function App() {
    const [role, setRole] = useState('');
    const [searchCode, setSearchCode] = useState('');
    const [activityInfo, setActivityInfo] = useState(null);
    const [msg, setMsg] = useState('');

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
                setMsg('');
            } else {
                setMsg(data.message);
                setActivityInfo(null);
            }
        } catch (error) {
            setMsg('Server error!');
        }
    };

    return (
        <div className="userComps">
            {!role ? (
                <Login setRole={setRole} />
            ) : role === 'professor' ? (
                <ProfessorForm />
            ) : (
             <StudentForm/>
            )}
        </div>
    );
}

export default App;
