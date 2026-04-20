import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { IoTimerSharp } from "react-icons/io5";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

const LoginPage = () => {
  // --- STATE ---
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Basic Validation
    if (!email || !password) {
      setErrorMessage("Please fill in all fields");
      return;
    } else if (!email.includes("@")) {
      setErrorMessage("Please enter a valid email address");
      return;
    } else if (password.length < 6 || password.length > 20) {
      setErrorMessage("Password must be at least 6 characters long");
      return;
    }

    // Mock Authentication
    if (email === "you@gmail.com" && password === "password123") {
      navigate("/home");
    } else {
      setErrorMessage("Invalid email or password");
    }
  };

  return (
    // 1. The main wrapper is now a flex container taking up the full screen.
    // md:flex-row means it will stack on mobile, but split 50/50 on desktop!
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* LEFT COLUMN: BRAND & MARKETING */}
      <div
        className="hidden lg:flex flex-1 items-center justify-center p-12 xl:p-20"
        style={{
          backgroundColor: "var(--color-primary-dark)",
          color: "var(--color-surface)",
        }}
      >
        {/* We wrap the content in a max-w-lg div so the text doesn't stretch too wide */}
        <div className="w-full max-w-lg">
          <h4
            style={{
              marginBottom: "var(--space-4)",
              color: "var(--color-text-inverse)",
            }}
          >
            Doctor Time
          </h4>

          <h1
            style={{
              color: "var(--color-text-inverse)",
              marginBottom: "var(--space-4)",
            }}
          >
            Your Health In Your Hands
          </h1>

          <p
            style={{
              color: "var(--color-text-inverse)",
              marginBottom: "var(--space-8)",
            }}
          >
            Book Appointments with Trusted Doctors in Doctor Time
          </p>

          <ul style={{ listStyle: "none", padding: 0 }}>
            <li
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "var(--space-3)",
              }}
            >
              <span style={{ color: "var(--color-accent)" }}>
                <VscWorkspaceTrusted size={24} />
              </span>
              Trusted doctors across specialties
            </li>
            <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ color: "var(--color-accent)" }}>
                <IoTimerSharp size={24} />
              </span>
              Book slots in under 60 seconds
            </li>
          </ul>
        </div>
      </div>

     
      {/* RIGHT COLUMN: LOGIN FORM CARD  */}
      
      {/* flex-1 makes this take up the other half of the screen */}
      <div
        className="flex-1 flex items-center justify-center p-6 sm:p-10 lg:p-16"
        style={{ backgroundColor: "var(--color-bg)" }}
      >
        <div className="card w-full max-w-md">
          {/* Header section of the card */}
          <div style={{ marginBottom: "var(--space-6)" }}>
            <h2>Welcome back</h2>
            <p className="text-muted">Sign in to your Doctor Time account</p>
          </div>

          {/* ADDED THIS: Display the error message if there is one! */}
          {errorMessage && (
            <div
              className="alert alert-error"
              style={{ marginBottom: "var(--space-4)" }}
            >
              {errorMessage}
            </div>
          )}

          {/* The Form */}
          <form onSubmit={handleLogin}>
            <div
              className="form-group"
              style={{ marginBottom: "var(--space-4)" }}
            >
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-input"
                placeholder="Your Email address"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div
              className="form-group"
              style={{ marginBottom: "var(--space-6)" }}
            >
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-input"
                placeholder="Your Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>

            <button className="btn btn-primary btn-full">Log In</button>
          </form>

          {/* DIVIDER & SOCIAL LOGIN */}
          <hr className="divider" />
          <div
            style={{
              textAlign: "center",
              marginTop: "-32px",
              marginBottom: "var(--space-4)",
            }}
          >
            <span
              className="text-small text-muted"
              style={{
                backgroundColor: "var(--color-surface)",
                padding: "0 var(--space-2)",
              }}
            >
              or continue with
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-3)",
            }}
          >
            <button className="btn btn-secondary btn-full">
              <FcGoogle size={20} /> Continue with Google
            </button>
            <button className="btn btn-secondary btn-full">
              <FaApple size={20} /> Continue with Apple
            </button>
          </div>

          <div style={{ marginTop: "var(--space-6)", textAlign: "center" }}>
            <p className="text-small">
              Need to Create an Account?{" "}
              <a
                href="#"
                style={{ color: "var(--color-primary)", fontWeight: "bold" }}
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
