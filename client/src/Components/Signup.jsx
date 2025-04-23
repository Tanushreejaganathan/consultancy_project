import React, { useState } from "react";
import {
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
  Link,
  FormHelperText,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const heading = { fontSize: "2.5rem", fontWeight: "600" };
  const paperStyle = {
    padding: "2rem",
    borderRadius: "1rem",
    boxShadow: "10px 10px 10px rgba(0,0,0,0.3)",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  };
  const row = { display: "flex", marginTop: "2rem" };
  const btnStyle = {
    marginTop: "2rem",
    fontSize: "1.2rem",
    fontWeight: "700",
    backgroundColor: "blue",
    borderRadius: "0.5rem",
  };
  const linkStyle = {
    marginTop: "1.5rem",
    display: "flex",
    justifyContent: "center",
  };

  const validatePassword = (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 digit, 1 special character
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(password);
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      window.alert(
        "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }

    if (password !== confirmPassword) {
      window.alert("Passwords do not match.");
      return;
    }

    axios
      .post("http://localhost:3001/consultancy/signup", {
        name,
        email,
        password,
      })
      .then((result) => {
        if (result.status === 201) {
          console.log("User created successfully");
          navigate("/login");
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          window.alert("Email already exists. Redirecting to login...");
          navigate("/login");
        } else {
          console.log(err);
        }
      });
  };

  return (
    <div
      style={{
        backgroundImage: "url('/lub2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingLeft: "5vw",
      }}
    >
      <Grid align="center">
        <Paper
          style={paperStyle}
          sx={{
            width: {
              xs: "80vw",
              sm: "50vw",
              md: "40vw",
              lg: "30vw",
              xl: "25vw",
            },
            height: "auto",
          }}
        >
          <Typography style={heading}>Signup</Typography>
          <form onSubmit={handleSignup}>
            <TextField
              style={row}
              required
              label="Enter Name"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              style={row}
              required
              label="Enter Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              style={row}
              required
              label="Enter Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={password && !validatePassword(password)}
              helperText={
                password && !validatePassword(password)
                  ? "Min 8 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special char."
                  : ""
              }
            />
            <TextField
              style={row}
              required
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={confirmPassword && confirmPassword !== password}
              helperText={
                confirmPassword && confirmPassword !== password
                  ? "Passwords do not match"
                  : ""
              }
            />
            <Button style={btnStyle} variant="contained" type="submit">
              Sign Up
            </Button>
          </form>
          <Typography style={linkStyle}>
            Already have an account?{" "}
            <Link
              href="/login"
              style={{ marginLeft: "5px", fontWeight: "600" }}
            >
              Login
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </div>
  );
};
