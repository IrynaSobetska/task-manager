import React from "react";
import { useState } from "react";
import "./Profile.css";

const Profile = () => {
  const [form, setForm] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    // event.preventDefault();

    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="profile-container">
      <p>Note: this function is not implemented yet</p>
      {form == "profile" ? (
        <div className="profile">
          <p>Profile</p>
          <button className="b-btn" onClick={() => setForm("login")}>
            Sign Out
          </button>
        </div>
      ) : (
        <div className="form-container">
          <form onSubmit={handleSubmit} className="p-form">
            {form == "login" ? (
              <div className="inp-cont">
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  // required
                  placeholder="Email"
                />
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  // required
                  placeholder="Password"
                />
              </div>
            ) : (
              <div className="inp-cont">
                <input
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  // required
                  placeholder="Name"
                />
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  // required
                  placeholder="Email"
                />
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  // required
                  placeholder="Password"
                />
              </div>
            )}

            <button
              className="b-btn"
              onClick={() => {
                form == "login" ? setForm("profile") : setForm("login");
              }}
              type="submit"
            >
              {form == "login" ? "Login" : "Create Account"}
            </button>
          </form>

          {form == "login" ? (
            <button className="change-form" onClick={() => setForm("signin")}>
              Create Account
            </button>
          ) : (
            <button className="change-form" onClick={() => setForm("login")}>
              Login
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
