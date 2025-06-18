import { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const signup = async () => {
        try {
            await api.post("/users/signup", { username, password });
            alert("Usuario creado. Ahora inicia sesión.");
            navigate("/login");
        } catch (err) {
            alert("Error al crear usuario");
        }
    };

    return (
        <Container maxWidth="xs">
            <Typography variant="h4" gutterBottom>Registro</Typography>
            <TextField fullWidth label="Usuario" margin="normal" onChange={e => setUsername(e.target.value)} />
            <TextField fullWidth type="password" label="Contraseña" margin="normal" onChange={e => setPassword(e.target.value)} />
            <Button variant="contained" fullWidth onClick={signup}>Registrarse</Button>
        </Container>
    );
}
