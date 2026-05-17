import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLock, FiMail, FiPhone, FiUser } from "react-icons/fi";
import { IoTimerSharp } from "react-icons/io5";
import { VscWorkspaceTrusted } from "react-icons/vsc";

const AuthBrandPanel = () => (
  <div
    className="hidden lg:flex flex-1 items-center justify-center p-12 xl:p-20"
    style={{
      backgroundColor: "var(--color-primary-dark)",
      color: "var(--color-surface)",
    }}
  >
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
        Start Your Health Journey
      </h1>
      <p
        style={{
          color: "var(--color-text-inverse)",
          marginBottom: "var(--space-8)",
        }}
      >
        Create one account for appointments, health records, reminders, and
        trusted doctor discovery.
      </p>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li className="flex items-center gap-2 mb-3">
          <span style={{ color: "var(--color-accent)" }}>
            <VscWorkspaceTrusted size={24} />
          </span>
          Secure patient profile
        </li>
        <li className="flex items-center gap-2">
          <span style={{ color: "var(--color-accent)" }}>
            <IoTimerSharp size={24} />
          </span>
          Faster bookings after signup
        </li>
      </ul>
    </div>
  </div>
);

const SignupPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const updateForm = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSignup = (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (
      !form.fullName ||
      !form.email ||
      !form.phone ||
      !form.password ||
      !form.confirmPassword
    ) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    if (!form.email.includes("@")) {
      setErrorMessage("Please enter a valid email address");
      return;
    }

    if (form.phone.replace(/\D/g, "").length < 10) {
      setErrorMessage("Please enter a valid phone number");
      return;
    }

    if (form.password.length < 6 || form.password.length > 20) {
      setErrorMessage("Password must be 6 to 20 characters long");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    navigate("/home");
  };

  return (
    <div className="page-shell flex flex-col lg:flex-row" style={{ padding: 0 }}>
      <AuthBrandPanel />

      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 lg:p-16">
        <div className="card w-full max-w-lg">
          <div style={{ marginBottom: "var(--space-6)" }}>
            <h2>Create account</h2>
            <p className="text-muted">Use email and phone to set up Doctor Time</p>
          </div>

          {errorMessage && (
            <div
              className="alert alert-error"
              style={{ marginBottom: "var(--space-4)" }}
            >
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSignup}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-group sm:col-span-2">
                <label htmlFor="fullName" className="form-label">
                  Full Name
                </label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    id="fullName"
                    className="form-input"
                    style={{ paddingLeft: "2.75rem" }}
                    placeholder="Sanjay Kanna"
                    value={form.fullName}
                    onChange={(event) =>
                      updateForm("fullName", event.target.value)
                    }
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="signupEmail" className="form-label">
                  Gmail or Email
                </label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    id="signupEmail"
                    className="form-input"
                    style={{ paddingLeft: "2.75rem" }}
                    placeholder="you@gmail.com"
                    value={form.email}
                    onChange={(event) => updateForm("email", event.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="signupPhone" className="form-label">
                  Phone Number
                </label>
                <div className="relative">
                  <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    id="signupPhone"
                    className="form-input"
                    style={{ paddingLeft: "2.75rem" }}
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={(event) => updateForm("phone", event.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="signupPassword" className="form-label">
                  Create Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    id="signupPassword"
                    className="form-input"
                    style={{ paddingLeft: "2.75rem" }}
                    placeholder="6 to 20 characters"
                    value={form.password}
                    onChange={(event) =>
                      updateForm("password", event.target.value)
                    }
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">
                  Retype Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    id="confirmPassword"
                    className="form-input"
                    style={{ paddingLeft: "2.75rem" }}
                    placeholder="Retype password"
                    value={form.confirmPassword}
                    onChange={(event) =>
                      updateForm("confirmPassword", event.target.value)
                    }
                  />
                </div>
              </div>
            </div>

            <button
              className="btn btn-primary btn-full"
              style={{ marginTop: "var(--space-6)" }}
            >
              Create Account
            </button>
          </form>

          <div style={{ marginTop: "var(--space-6)", textAlign: "center" }}>
            <p className="text-small">
              Already have an account?{" "}
              <Link
                to="/login"
                style={{ color: "var(--color-primary)", fontWeight: "bold" }}
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
