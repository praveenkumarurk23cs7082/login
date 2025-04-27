import React, { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('✅ Login successful!');
      } else {
        setMessage('❌ Login failed: ' + data.message);
      }
    } catch (error) {
      setMessage('❌ Error connecting to server');
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      fontFamily: '"Poppins", sans-serif',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(15px)',
        padding: '40px 30px',
        borderRadius: '20px',
        boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.25)',
        animation: 'fadeSlide 1s ease',
        color: '#fff'
      }}>
        <h2 style={{
          textAlign: 'center',
          marginBottom: '25px',
          fontWeight: '600',
          fontSize: '28px',
          letterSpacing: '1px',
        }}>
          Member Login
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px', position: 'relative' }}>
            <label style={{ fontSize: '14px', marginBottom: '8px', display: 'block' }}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 15px',
                borderRadius: '10px',
                border: 'none',
                background: 'rgba(255, 255, 255, 0.3)',
                color: '#fff',
                fontSize: '15px',
                outline: 'none',
                transition: '0.3s',
              }}
              placeholder="Enter username"
              required
              onFocus={(e) => e.target.style.background = 'rgba(255,255,255,0.5)'}
              onBlur={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
            />
          </div>

          <div style={{ marginBottom: '25px', position: 'relative' }}>
            <label style={{ fontSize: '14px', marginBottom: '8px', display: 'block' }}>Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 40px 12px 15px',
                borderRadius: '10px',
                border: 'none',
                background: 'rgba(255, 255, 255, 0.3)',
                color: '#fff',
                fontSize: '15px',
                outline: 'none',
                transition: '0.3s',
              }}
              placeholder="Enter password"
              required
              onFocus={(e) => e.target.style.background = 'rgba(255,255,255,0.5)'}
              onBlur={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '15px',
                top: '40px',
                cursor: 'pointer',
                fontSize: '18px',
                color: '#fff',
              }}
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>

          <button type="submit" disabled={loading} style={{
            width: '100%',
            padding: '14px',
            background: loading ? '#ccc' : 'linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)',
            color: '#000',
            fontWeight: '600',
            fontSize: '16px',
            border: 'none',
            borderRadius: '10px',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: '0.3s',
          }}
            onMouseOver={(e) => {
              if (!loading) e.target.style.opacity = 0.8;
            }}
            onMouseOut={(e) => {
              if (!loading) e.target.style.opacity = 1;
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {message && (
          <div style={{
            marginTop: '25px',
            padding: '12px',
            backgroundColor: message.includes('successful') ? 'rgba(0,255,0,0.2)' : 'rgba(255,0,0,0.2)',
            color: message.includes('successful') ? '#00FF7F' : '#FF4500',
            borderRadius: '10px',
            textAlign: 'center',
            fontWeight: '600',
            fontSize: '14px'
          }}>
            {message}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeSlide {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default Login;
