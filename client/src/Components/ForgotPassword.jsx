/*import React, { useState } from "react";
import { Grid, Paper, TextField, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Password validation regex (at least 8 characters, 1 uppercase, 1 lowercase, 1 special character)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

    const handleResetPassword = (e) => {
        e.preventDefault();

        // Check if the passwords match
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        // Check password format
        if (!passwordRegex.test(newPassword)) {
            setError("Password must contain at least 8 characters, including 1 uppercase, 1 lowercase, and 1 special character.");
            return;
        }

        axios.post("http://localhost:3001/reset-password", { email, newPassword })
            .then(result => {
                if (result.status === 200) {
                    alert("Password updated successfully!");
                    navigate("/login"); // Redirect to login page after reset
                }
            })
            .catch(err => {
                setError("Error resetting password");
                console.log(err);
            });
    };

    return (
        <Grid align="center">
            <Paper style={{ padding: "2rem", margin: "100px auto", borderRadius: "1rem", boxShadow: "10px 10px 10px" }}>
                <Typography style={{ fontSize: "2.5rem", fontWeight: "600" }}>Reset Password</Typography>
                <form onSubmit={handleResetPassword}>
                    <TextField
                        style={{ marginTop: "2rem" }}
                        required
                        label="Enter Email"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        style={{ marginTop: "2rem" }}
                        required
                        label="New Password"
                        type="password"
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <TextField
                        style={{ marginTop: "2rem" }}
                        required
                        label="Confirm Password"
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {error && <Typography style={{ color: "red", marginTop: "1rem" }}>{error}</Typography>}
                    <Button
                        style={{ marginTop: "2rem", fontSize: "1.2rem", fontWeight: "700", backgroundColor: "blue", borderRadius: "0.5rem" }}
                        type="submit"
                        variant="contained"
                    >
                        Reset Password
                    </Button>
                </form>
            </Paper>
        </Grid>
    );
};
*/
import React, { useState } from "react";
import {
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
  Alert,
  Box
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  // Password validation regex (at least 8 characters, 1 uppercase, 1 lowercase, 1 special character)
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

  const handleResetPassword = (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!passwordRegex.test(newPassword)) {
      setError(
        "Password must be at least 8 characters long and include 1 uppercase, 1 lowercase, and 1 special character."
      );
      return;
    }

    axios
      .post("http://localhost:3001/reset-password", { email, newPassword })
      .then((result) => {
        if (result.status === 200) {
          setSuccessMsg("Password updated successfully!");
          setTimeout(() => navigate("/login"), 2000);
        }
      })
      .catch((err) => {
        setError("Error resetting password. Please try again.");
        console.error(err);
      });
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
      <Paper elevation={10} style={{ padding: "3rem", borderRadius: "1rem", maxWidth: "450px", width: "100%" }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
          Reset Password
        </Typography>

        <form onSubmit={handleResetPassword}>
          <TextField
            fullWidth
            margin="normal"
            label="Enter Email"
            type="email"
            variant="outlined"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="New Password"
            type="password"
            variant="outlined"
            required
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Confirm Password"
            type="password"
            variant="outlined"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {error && (
            <Box mt={2}>
              <Alert severity="error">{error}</Alert>
            </Box>
          )}

          {successMsg && (
            <Box mt={2}>
              <Alert severity="success">{successMsg}</Alert>
            </Box>
          )}

          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 3, fontWeight: "bold", borderRadius: "0.5rem", padding: "0.8rem" }}
          >
            Reset Password
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};
