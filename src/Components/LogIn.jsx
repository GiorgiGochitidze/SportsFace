import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

const LogIn = () => {
  const [userName, setUserName] = useState("");
  const [surName, setSurName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error message
  const navigate = useNavigate();

  const formSubmit = () => {
    if (!userName || !surName || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setError(""); // Reset error message

    fetch("https://sportsface.onrender.com/logIn", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName, surName, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Login failed");
        }
        return response.json();
      })
      .then((data) => {
        navigate(`/Home/${data.userName}/${data.surName}`); // Navigate to Home with userName and surName
      })
      .catch((error) => {
        setError("Login failed. User Doesn't Exist");
        setUserName('')
        setSurName('')
        setPassword('')
        console.error("Error:", error);
      });
  };

  return (
    <>
      <Navbar />

      <form action="">
        <h1>Login Form</h1>
        {error && <p>{error}</p>}
        <label id="name">
          Your Name:
          <input
            required
            value={userName}
            type="text"
            name="name"
            placeholder="Name"
            onChange={(e) => {
              setError("");
              setUserName(e.target.value);
            }}
          />
        </label>
        <label id="surname">
          Your SurName:
          <input
            required
            value={surName}
            type="text"
            name="surname"
            placeholder="SurName"
            onChange={(e) => {
              setError("");
              setSurName(e.target.value);
            }}
          />
        </label>
        <label id="password">
          Your Password:
          <input
            required
            value={password}
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => {
              setError("");
              setPassword(e.target.value);
            }}
          />
        </label>
        <button onClick={formSubmit} className="registration-btn" type="button">
          Login
        </button>
      </form>
    </>
  );
};

export default LogIn;
