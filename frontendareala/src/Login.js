import React from "react";
import {useState} from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';



function Login({ setRole }) {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [msg, setMsg] = useState('');
    const [isShaking, setIsShaking] = useState(false);

    const handleLogin = async () => {
        if (!email || !pass) {
            setMsg('Email and password are required');
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 500);
            return;
        }
    
        try {
            const response = await fetch('https://webtechdevproject.onrender.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, pass }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                setMsg(data.message);
                setRole(data.role);
            } else {
                setMsg(data.message);
            }
        } catch (error) {
            setMsg('Login error');
        }
    };

    return (
        <div className={`login_form ${isShaking ? "shake" : ""}`}>
          <h1 class="h1_design">Login</h1>
          <div className="login_box">
            <div className="input_with_icon">
                <i class="fa-solid fa-user"></i>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input_with_icon">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
            </div>
            <button className="button_with_icon" onClick={handleLogin}>
              <i className="fas fa-sign-in-alt"></i> Login
            </button>
          </div>
          <div className={`message ${msg === 'Server error' ? 'error' : 'info'}`}>
            {msg}
          </div>
        </div>
      );
      
}

export default Login;