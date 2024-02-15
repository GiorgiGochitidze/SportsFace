const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

app.use(cors());
app.use(bodyParser.json());

const PORT = 5000;
const registeredUsersPath = "./registeredUsers.json";

let registeredUsers = []; // Move the declaration here

// Read existing users from the file at server start
try {
  const data = fs.readFileSync(registeredUsersPath);
  registeredUsers = JSON.parse(data);
} catch (err) {
  if (err.code !== "ENOENT") {
    // Ignore if file doesn't exist
    console.error("Failed to read registered users:", err);
  }
}

// Register route
app.post("/register", (req, res) => {
  const { userName, surName, password } = req.body;

  // Check if user already exists
  const existingUser = registeredUsers.find(
    (user) => user.userName === userName && user.surName === surName
  );
  if (existingUser) {
    return res
      .status(400)
      .json({ error: "User with this user name and surname already exists" });
  }

  // Add new user to the array with the userName and surName as the unique identifier
  registeredUsers.push({ userName, surName, password });

  // Write updated user data back to the file
  fs.writeFile(
    registeredUsersPath,
    JSON.stringify(registeredUsers, null, 2),
    (err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to register user" });
      }
      return res.status(201).json({ message: "User Registered Successfully" });
    }
  );
});

// Login route
app.post("/logIn", (req, res) => {
  const { userName, surName, password } = req.body;

  const user = registeredUsers.find(
    (user) =>
      user.userName === userName &&
      user.surName === surName &&
      user.password === password
  );

  if (user) {
    res.json({ message: "User Logged In Successfully", userName, surName });
  } else {
    res
      .status(401)
      .json({ message: "Login failed. Incorrect username or password." });
  }
});


// Route to get user data
app.get("/getUserData/:userId", (req, res) => {
  const { userId } = req.params;
  const user = registeredUsers.find((user) => user.id === userId);
  if (user) {
    res.json({ user });
  } else {
    res.status(404).json({ error: "User not found" });
  }
});
  

app.get("/", (req, res) => {
  res.send("hello World");
});

app.listen(PORT, () => {
  console.log(`server is running on localhost ${PORT}`);
});
