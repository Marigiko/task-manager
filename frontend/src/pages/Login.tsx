import { useState } from "react";
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    Alert,
    InputAdornment,
    IconButton
} from "@mui/material";
import { Visibility, VisibilityOff, Lock, Person } from "@mui/icons-material";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const login = async () => {
        if (!username || !password) {
            setError("Por favor completa todos los campos");
            return;
        }
        try {
            const res = await api.post("/users/login", { username, password });
            localStorage.setItem("token", res.data.access_token);
            localStorage.setItem("username", username);
            navigate("/");
        } catch (err) {
            setError("Credenciales inválidas");
        }
    };

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
                px: 2
            }}
        >
            <Container
                maxWidth="xs"
                sx={{
                    bgcolor: "white",
                    p: 4,
                    borderRadius: 3,
                    boxShadow: "0 8px 32px rgba(0,0,0,0.12)"
                }}
            >
                <Typography variant="h4" gutterBottom align="center" fontWeight="700" color="#2575fc">
                    Iniciar Sesión
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <TextField
                    fullWidth
                    label="Usuario"
                    margin="normal"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Person color="primary" />
                                </InputAdornment>
                            ),
                        }
                    }}
                />

                <TextField
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    label="Contraseña"
                    margin="normal"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Lock color="primary" />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }
                    }}
                />

                <Button
                    variant="contained"
                    fullWidth
                    onClick={login}
                    sx={{
                        mt: 3,
                        py: 1.5,
                        fontWeight: "700",
                        fontSize: "1.1rem",
                        background: "linear-gradient(45deg, #6a11cb 30%, #2575fc 90%)",
                        boxShadow: "0 4px 15px rgba(101, 41, 255, 0.4)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                            boxShadow: "0 6px 20px rgba(101, 41, 255, 0.7)",
                            background: "linear-gradient(45deg, #4b09b8 30%, #1e56d1 90%)",
                        }
                    }}
                >
                    Entrar
                </Button>
            </Container>
        </Box>
    );
}
