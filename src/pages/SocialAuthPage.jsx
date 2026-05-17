import React, { useMemo, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FiCheckCircle, FiLock, FiMail, FiPhone, FiShield } from "react-icons/fi";

const providerConfig = {
  google: {
    name: "Google",
    icon: FcGoogle,
    email: "sanjay.kanna@gmail.com",
    buttonClass: "btn-secondary",
  },
  apple: {
    name: "Apple",
    icon: FaApple,
    email: "sanjay@icloud.com",
    buttonClass: "btn-primary",
  },
};

const SocialAuthPage = () => {
  const navigate = useNavigate();
  const { provider } = useParams();
  const config = providerConfig[provider];
  const [step, setStep] = useState("choose");
  const [form, setForm] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const ProviderIcon = useMemo(() => config?.icon, [config]);

  if (!config) {
    return <Navigate to="/login" replace />;
  }

  const updateForm = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const continueWithProvider = () => {
    setForm((current) => ({ ...current, email: config.email }));
    setStep("password");
  };

  const handleCreatePassword = (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (!form.email || !form.phone || !form.password || !form.confirmPassword) {
      setErrorMessage("Please complete all fields");
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
    <div className="page-shell flex items-center justify-center p-6 sm:p-10">
      <div className="w-full max-w-md">
        <div className="card">
          <div className="text-center" style={{ marginBottom: "var(--space-6)" }}>
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-gray-100 bg-white shadow-sm">
              <ProviderIcon size={30} />
            </div>
            <h2>Sign in with {config.name}</h2>
            <p className="text-muted">
              {step === "choose"
                ? `Continue to Doctor Time using your ${config.name} account`
                : "Create your Doctor Time password to finish setup"}
            </p>
          </div>

          {step === "choose" ? (
            <div className="flex flex-col gap-4">
              <div
                className="rounded-2xl border border-gray-100 bg-gray-50/70"
                style={{ padding: "var(--space-4)" }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 font-bold text-gray-700">
                    SK
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-gray-900 truncate">
                      Sanjay Kanna
                    </p>
                    <p className="text-sm text-muted truncate">{config.email}</p>
                  </div>
                  <FiCheckCircle className="ml-auto text-emerald-600" size={22} />
                </div>
              </div>

              <button
                className={`btn ${config.buttonClass} btn-full`}
                onClick={continueWithProvider}
              >
                <ProviderIcon size={20} /> Continue
              </button>

              <button className="btn btn-ghost btn-full" onClick={() => navigate("/login")}>
                Use another sign-in method
              </button>
            </div>
          ) : (
            <>
              {errorMessage && (
                <div
                  className="alert alert-error"
                  style={{ marginBottom: "var(--space-4)" }}
                >
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleCreatePassword}>
                <div className="form-group" style={{ marginBottom: "var(--space-4)" }}>
                  <label htmlFor="socialEmail" className="form-label">
                    Gmail or Email
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      id="socialEmail"
                      className="form-input"
                      style={{ paddingLeft: "2.75rem" }}
                      value={form.email}
                      onChange={(event) => updateForm("email", event.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: "var(--space-4)" }}>
                  <label htmlFor="socialPhone" className="form-label">
                    Phone Number
                  </label>
                  <div className="relative">
                    <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      id="socialPhone"
                      className="form-input"
                      style={{ paddingLeft: "2.75rem" }}
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={(event) => updateForm("phone", event.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: "var(--space-4)" }}>
                  <label htmlFor="socialPassword" className="form-label">
                    Create Password
                  </label>
                  <div className="relative">
                    <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="password"
                      id="socialPassword"
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

                <div className="form-group" style={{ marginBottom: "var(--space-6)" }}>
                  <label htmlFor="socialConfirmPassword" className="form-label">
                    Retype Password
                  </label>
                  <div className="relative">
                    <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="password"
                      id="socialConfirmPassword"
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

                <button className="btn btn-primary btn-full">
                  Finish Account Setup
                </button>
              </form>
            </>
          )}

          <div className="alert alert-info mt-6">
            <FiShield size={18} />
            <span>
              This is a frontend preview. Real {config.name} authentication can
              connect here when backend auth is ready.
            </span>
          </div>

          <div style={{ marginTop: "var(--space-6)", textAlign: "center" }}>
            <p className="text-small">
              Back to{" "}
              <Link
                to="/login"
                style={{ color: "var(--color-primary)", fontWeight: "bold" }}
              >
                login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialAuthPage;
