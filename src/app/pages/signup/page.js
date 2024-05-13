"use client";
import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { addUser } from "../../../../redux/actions/user";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";

const SignUp = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [userName, setUserName] = useState();
  const [passWord, setPassWord] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  const handleSubmit = async () => {
    const errors = {};
    if (!firstName) {
      errors.firstName = "First name is required";
    }
    if (!lastName) {
      errors.lastName = "Last name is required";
    }
    if (!email) {
      errors.email = "Email is required";
    }
    if (!userName) {
      errors.userName = "Username is required";
    }
    if (!passWord) {
      errors.passWord = "Password is required";
    }
    if (!phoneNumber) {
      errors.phoneNumber = "Phone number is required";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    setLoading(true);

    const body = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      username: userName,
      phoneNumber: phoneNumber,
      password: passWord,
    };
     dispatch(addUser(body));
    setLoading(false);
  };

  const handleLoginClick = () => {
    router.push("/pages/login"); 
  };

  return (
    <>
      <ThemeProvider theme={createTheme()}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box action={""} component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    error={!!errors.userName}
                    helperText={errors.userName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="phone"
                    label="Contact Number"
                    type="phone"
                    id="phone"
                    autoComplete="phone"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber}
                    inputProps={{ maxLength: 10 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={passWord}
                    onChange={(e) => setPassWord(e.target.value)}
                    error={!!errors.passWord}
                    helperText={errors.passWord}
                  />
                </Grid>
              </Grid>
              <Button
                onClick={() => {
                  handleSubmit();
                }}
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 2 }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Signup"
                )}
              </Button>
             
               <Typography variant="body2" color="textSecondary">
                  Already have an account?{" "}
                  <span
                    onClick={handleLoginClick}
                    style={{
                      cursor: "pointer",
                      color: "#1976d2",
                      textDecoration: "underline",
                    }}
                  >
                    Login
                  </span>
                </Typography>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};
export default SignUp;
