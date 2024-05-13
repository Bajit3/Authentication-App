"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../../redux/actions/user";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async () => {
    const errors = {};
    if (!email) {
      errors.email = "Please enter email";
    }
    if (!password) {
      errors.password = "Please enter password";
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    setLoading(true);
    const body = {
      email,
      password,
    };
    await dispatch(loginUser(body));
    router.push("/pages/dashboard");
    setLoading(false);
  };

  const handleSignupClick = () => {
    router.push("/pages/signup");
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
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
            Login
          </Typography>
          <Box action={""} component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
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
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!errors.password}
                  helperText={errors.password}
                />
              </Grid>
            </Grid>
            <Button
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Login"
              )}
            </Button>
            <Typography variant="body2" color="textSecondary">
              Create new account{" "}
              <span
                onClick={handleSignupClick}
                style={{
                    cursor: "pointer",
                    color: "#1976d2",
                    textDecoration: "underline",
                }}
              >
                Signup
              </span>
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;
