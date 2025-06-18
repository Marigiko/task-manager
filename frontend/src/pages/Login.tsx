import { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const login = async () => {
        try {
            const res = await api.post("/users/login", { username, password });
            localStorage.setItem("token", res.data.access_token);
            localStorage.setItem("username", username);
            navigate("/");
        } catch (err) {
            alert("Credenciales inválidas");
        }
    };

    return (
        <Container maxWidth="xs">
            <Typography variant="h4" gutterBottom>Iniciar Sesión</Typography>
            <TextField fullWidth label="Usuario" margin="normal" onChange={e => setUsername(e.target.value)} />
            <TextField fullWidth type="password" label="Contraseña" margin="normal" onChange={e => setPassword(e.target.value)} />
            <Button variant="contained" fullWidth onClick={login}>Entrar</Button>
        </Container>
    );
}
