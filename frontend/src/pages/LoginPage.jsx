import React, { useState } from 'react';
import styles from './LoginPage.module.css';
import { login } from '../api/authApi';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    if (!username || !password) {
      setMessage('Please fill in both fields.');
      return;
    }
    try {
      setLoading(true);
      const res = await login({ username, password });
      localStorage.setItem('cu_token', res.token);
      setMessage('Login successful! Redirecting...');
      setTimeout(() => {
        window.location.href = '/';
      }, 800);
    } catch (err) {
      setMessage('Invalid username or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.email}>
        <div className="page-title">
          <h2>Sign in</h2>
          <img src="/chitkara-image.png" alt="Chitkara Logo" height="40" />
        </div>
        <form onSubmit={onSubmit} className="section">
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              className="form-control"
              placeholder="Enter your university username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <div className="form-text helper">Your registered username (e.g., john.doe).</div>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPassword((s) => !s)}>
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div className="d-grid">
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? (
                <span className="d-inline-flex align-items-center gap-2">
                  <span className="spinner" /> Logging in...
                </span>
              ) : 'Login'}
            </button>
          </div>

          {message && <div className="mt-3 alert alert-info">{message}</div>}
        </form>
      </div>
    </div>
  );
}
