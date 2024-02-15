import "../CSS/Registration.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

const Registration = () => {
  const [userName, setUserName] = useState("");
  const [surName, setSurName] = useState("");
  const [password, setPassword] = useState("");
  const [succesReg, setSuccesReg] = useState("");
  const navigate = useNavigate();

  const formSubmit = () => {
    if (!userName || !surName || !password) {
      // If any of the fields are empty, set error message and return
      setSuccesReg("Please fill in all fields.");
      return;
    }

    fetch("https://sportsface.onrender.com/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName, surName, password }),
    })
      .then((response) => {
        if (response.ok) {
          setSuccesReg("User Registered Successfully");
          setUserName("");
          setSurName("");
          setPassword("");
          navigate("/LogIn");
        } else {
          throw new Error("Registration failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setSuccesReg("User Registration Failed. Please Try Again.");
      });
  };

  return (
    <>
      <Navbar />
      <form action="">
        <h1>Registration Form</h1>
        {succesReg && <p>{succesReg}</p>}
        <label id="name">
          Your Name:
          <input
            required
            value={userName}
            type="text"
            name="name"
            placeholder="Name"
            onChange={(e) => {
              setSuccesReg(""), setUserName(e.target.value);
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
              setSuccesReg(""), setSurName(e.target.value);
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
              setSuccesReg(""), setPassword(e.target.value);
            }}
          />
        </label>

        <button onClick={formSubmit} className="registration-btn" type="button">
          Register
        </button>
      </form>
    </>
  );
};

export default Registration;
