import React, { useState } from "react";
import {
  FiBell,
  FiCalendar,
  FiCreditCard,
  FiGlobe,
  FiLock,
  FiMail,
  FiMapPin,
  FiMonitor,
  FiPhone,
  FiShield,
  FiSmartphone,
  FiTrash2,
  FiUserCheck,
} from "react-icons/fi";

const Toggle = ({ checked, onChange, label }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={label}
    onClick={onChange}
    className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors ${
      checked ? "bg-emerald-600" : "bg-gray-300"
    }`}
  >
    <span
      className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${
        checked ? "translate-x-6" : "translate-x-1"
      }`}
    />
  </button>
);

const SettingsRow = ({ icon: Icon, title, description, children }) => (
  <div className="card hover:transform-none">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <span className="icon-tile">
          {React.createElement(Icon, { size: 20 })}
        </span>
        <div>
          <h3 className="font-bold text-base">{title}</h3>
          <p className="text-sm text-muted">{description}</p>
        </div>
      </div>
      <div className="sm:ml-4">{children}</div>
    </div>
  </div>
);

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    appointmentReminders: true,
    healthReportEmails: true,
    smsUpdates: true,
    marketingEmails: false,
    twoFactorAuth: false,
    locationAccess: true,
    shareRecords: true,
    darkMode: false,
  });

  const updateSetting = (key) => {
    setSettings((current) => ({ ...current, [key]: !current[key] }));
  };

  return (
    <div className="page-shell">
      <div className="page-container">
        <div className="page-header">
          <span className="section-title">Account Control</span>
          <h1 className="page-title">Settings</h1>
          <p className="page-subtitle">
            Manage notifications, privacy, app preferences, and account safety
            for Doctor Time.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <section className="xl:col-span-2 flex flex-col gap-6">
            <div className="content-card">
              <h2 className="text-xl font-bold mb-4">Notifications</h2>
              <div className="flex flex-col gap-3">
                <SettingsRow
                  icon={FiCalendar}
                  title="Appointment Reminders"
                  description="Get reminders before upcoming doctor visits."
                >
                  <Toggle
                    label="Appointment reminders"
                    checked={settings.appointmentReminders}
                    onChange={() => updateSetting("appointmentReminders")}
                  />
                </SettingsRow>
                <SettingsRow
                  icon={FiMail}
                  title="Health Report Emails"
                  description="Receive updates when a report is added to your vault."
                >
                  <Toggle
                    label="Health report emails"
                    checked={settings.healthReportEmails}
                    onChange={() => updateSetting("healthReportEmails")}
                  />
                </SettingsRow>
                <SettingsRow
                  icon={FiPhone}
                  title="SMS Updates"
                  description="Allow booking confirmations and urgent changes by SMS."
                >
                  <Toggle
                    label="SMS updates"
                    checked={settings.smsUpdates}
                    onChange={() => updateSetting("smsUpdates")}
                  />
                </SettingsRow>
                <SettingsRow
                  icon={FiBell}
                  title="Promotional Updates"
                  description="Occasional offers and healthcare campaign messages."
                >
                  <Toggle
                    label="Promotional updates"
                    checked={settings.marketingEmails}
                    onChange={() => updateSetting("marketingEmails")}
                  />
                </SettingsRow>
              </div>
            </div>

            <div className="content-card">
              <h2 className="text-xl font-bold mb-4">Privacy & Security</h2>
              <div className="flex flex-col gap-3">
                <SettingsRow
                  icon={FiLock}
                  title="Two-Factor Authentication"
                  description="Add an extra verification step when signing in."
                >
                  <Toggle
                    label="Two-factor authentication"
                    checked={settings.twoFactorAuth}
                    onChange={() => updateSetting("twoFactorAuth")}
                  />
                </SettingsRow>
                <SettingsRow
                  icon={FiMapPin}
                  title="Location Access"
                  description="Use your location to suggest nearby doctors."
                >
                  <Toggle
                    label="Location access"
                    checked={settings.locationAccess}
                    onChange={() => updateSetting("locationAccess")}
                  />
                </SettingsRow>
                <SettingsRow
                  icon={FiShield}
                  title="Share Records With Doctors"
                  description="Let doctors view approved reports during bookings."
                >
                  <Toggle
                    label="Share records with doctors"
                    checked={settings.shareRecords}
                    onChange={() => updateSetting("shareRecords")}
                  />
                </SettingsRow>
              </div>
            </div>
          </section>

          <aside className="flex flex-col gap-6">
            <div className="content-card">
              <h2 className="text-xl font-bold mb-4">App Preferences</h2>
              <div className="flex flex-col gap-4">
                <div className="form-group">
                  <label className="form-label" htmlFor="language">
                    Language
                  </label>
                  <select id="language" className="form-select">
                    <option>English</option>
                    <option>Hindi</option>
                    <option>Tamil</option>
                    <option>Kannada</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="timezone">
                    Time Zone
                  </label>
                  <select id="timezone" className="form-select">
                    <option>India Standard Time</option>
                    <option>UTC</option>
                    <option>Eastern Time</option>
                  </select>
                </div>
                <SettingsRow
                  icon={FiMonitor}
                  title="Dark Mode"
                  description="Use a darker interface when available."
                >
                  <Toggle
                    label="Dark mode"
                    checked={settings.darkMode}
                    onChange={() => updateSetting("darkMode")}
                  />
                </SettingsRow>
              </div>
            </div>

            <div className="content-card">
              <h2 className="text-xl font-bold mb-4">Connected Services</h2>
              <div className="flex flex-col gap-3">
                <button className="btn btn-secondary btn-full justify-start">
                  <FiSmartphone size={18} /> Manage Devices
                </button>
                <button className="btn btn-secondary btn-full justify-start">
                  <FiCreditCard size={18} /> Payment Methods
                </button>
                <button className="btn btn-secondary btn-full justify-start">
                  <FiGlobe size={18} /> Insurance Details
                </button>
                <button className="btn btn-secondary btn-full justify-start">
                  <FiUserCheck size={18} /> Emergency Contacts
                </button>
              </div>
            </div>

            <div className="alert alert-warning">
              Settings are saved locally for now. Backend sync can plug into
              these controls later.
            </div>

            <button className="btn btn-danger btn-full">
              <FiTrash2 size={18} /> Delete Account
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
