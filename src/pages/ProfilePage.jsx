import React, { useState } from "react";
import {
  FiCalendar,
  FiEdit2,
  FiMail,
  FiMapPin,
  FiPhone,
  FiSave,
  FiUser,
  FiX,
} from "react-icons/fi";
import Avatar from "../components/search/common/Avatar";

const initialProfile = {
  fullName: "Sanjay Kanna",
  age: "25",
  dateOfBirth: "2001-04-27",
  location: "Puducherry, India",
  phoneNumber: "+91 98765 43210",
  email: "sanjay.kanna@example.com",
  gender: "Male",
  medicalCondition: "No known chronic disease or disability",
};

const profileFields = [
  { key: "fullName", label: "Full Name", icon: FiUser, type: "text" },
  { key: "age", label: "Age", icon: FiCalendar, type: "number" },
  { key: "dateOfBirth", label: "Date of Birth", icon: FiCalendar, type: "date" },
  { key: "location", label: "Location", icon: FiMapPin, type: "text" },
  { key: "phoneNumber", label: "Phone Number", icon: FiPhone, type: "tel" },
  { key: "email", label: "Email", icon: FiMail, type: "email" },
  { key: "gender", label: "Gender", icon: FiUser, type: "select" },
  {
    key: "medicalCondition",
    label: "Disability / Disease",
    icon: FiUser,
    type: "textarea",
  },
];

const ProfilePage = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [draftProfile, setDraftProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);

  const updateDraft = (key, value) => {
    setDraftProfile((current) => ({ ...current, [key]: value }));
  };

  const handleEdit = () => {
    setDraftProfile(profile);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setDraftProfile(profile);
    setIsEditing(false);
  };

  const handleSave = () => {
    setProfile(draftProfile);
    setIsEditing(false);
  };

  const activeProfile = isEditing ? draftProfile : profile;

  return (
    <div className="page-shell">
      <div className="page-container">
        <div className="page-header">
          <span className="section-title">Patient Account</span>
          <h1 className="page-title">Profile</h1>
          <p className="page-subtitle">
            Keep your personal details accurate so appointments, reports, and
            reminders reach the right place.
          </p>
        </div>

        <div className="content-card">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <Avatar name={profile.fullName} size="xl" />
              <div>
                <h2 className="text-2xl font-bold">{profile.fullName}</h2>
                <p className="text-muted">Patient ID DT-2408</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {isEditing ? (
                <>
                  <button className="btn btn-secondary" onClick={handleCancel}>
                    <FiX size={18} /> Cancel
                  </button>
                  <button className="btn btn-primary" onClick={handleSave}>
                    <FiSave size={18} /> Save Changes
                  </button>
                </>
              ) : (
                <button className="btn btn-primary" onClick={handleEdit}>
                  <FiEdit2 size={18} /> Edit Profile
                </button>
              )}
            </div>
          </div>

          <hr className="divider" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {profileFields.map(({ key, label, icon: Icon, type }) => (
              <div key={key} className="card hover:transform-none">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <span className="icon-tile">
                      {React.createElement(Icon, { size: 20 })}
                    </span>
                    <div className="form-group min-w-0 flex-1">
                      <label className="form-label" htmlFor={key}>
                        {label}
                      </label>
                      {isEditing && type === "select" ? (
                        <select
                          id={key}
                          className="form-select"
                          value={activeProfile[key]}
                          onChange={(event) =>
                            updateDraft(key, event.target.value)
                          }
                        >
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                          <option>Prefer not to say</option>
                        </select>
                      ) : isEditing && type === "textarea" ? (
                        <textarea
                          id={key}
                          className="form-textarea min-h-24"
                          value={activeProfile[key]}
                          onChange={(event) =>
                            updateDraft(key, event.target.value)
                          }
                        />
                      ) : isEditing ? (
                        <input
                          id={key}
                          className="form-input"
                          type={type}
                          value={activeProfile[key]}
                          onChange={(event) =>
                            updateDraft(key, event.target.value)
                          }
                        />
                      ) : (
                        <p className="font-semibold break-words">
                          {activeProfile[key]}
                        </p>
                      )}
                    </div>
                  </div>

                  {!isEditing && (
                    <button
                      aria-label={`Edit ${label}`}
                      className="btn btn-ghost btn-sm shrink-0"
                      onClick={handleEdit}
                    >
                      <FiEdit2 size={16} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
