
  import React, { useState } from "react";
  import { Grid, Paper, TextField, Typography, Button } from "@mui/material";
  import { useNavigate, Link } from "react-router-dom"; // ✅ Import Link
  import axios from "axios";

  export const Login = ({ setIsLoggedIn }) => {
    const heading = { fontSize: "2.5rem", fontWeight: "600" };
    const paperStyle = {
      padding: "2rem",
      margin: "100px auto",
      borderRadius: "1rem",
      boxShadow: "10px 10px 10px",
      maxWidth: "400px",
    };
    const row = { display: "flex", marginTop: "2rem" };
    const btnStyle = {
      marginTop: "2rem",
      fontSize: "1.2rem",
      fontWeight: "700",
      backgroundColor: "blue",
      borderRadius: "0.5rem",
    };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
      e.preventDefault();

      axios
        .post("http://localhost:3001/login", { email, password })
        .then((result) => {
          if (result.data.message == "Login successful") {
            setIsLoggedIn(true); // Set login state to true
            navigate("/home"); // Redirect to home
          } else {
            alert("Login failed");
          }
        })
        .catch((err) => {
          console.error(err);
          alert("An error occurred while logging in");
        });
    };

    return (
      <Grid align="center">
        <Paper style={paperStyle}>
          <Typography style={heading}>Login</Typography>
          <form onSubmit={handleLogin}>
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              style={row}
              name="email"
              label="Enter Email"
              type="email"
              required
            />
            <TextField
              onChange={(e) => setPassword(e.target.value)}
              style={row}
              name="password"
              label="Enter Password"
              type="password"
              required
            />
            <Button type="submit" style={btnStyle} variant="contained">
              Login
            </Button>

            {/* ✅ Forgot Password Link */}
            <Typography style={{ marginTop: "1rem" }}>
              <Link to="/forgot-password">Forgot Password?</Link>
            </Typography>
          </form>
        </Paper>
      </Grid>
    );
  };
