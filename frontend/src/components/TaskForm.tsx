import { useState } from "react";
import { TextField, Button, Stack, Alert } from "@mui/material";
import api from "../api/axios";

export default function TaskForm({ onCreate }: { onCreate: () => void }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const submit = async () => {
        setError("");
        if (!title.trim()) {
            setError("El título es obligatorio");
            return;
        }
        setLoading(true);
        try {
            const username = localStorage.getItem("username");
            await api.post("/tasks/", { title, description, owner: username });
            setTitle("");
            setDescription("");
            onCreate();
        } catch {
            setError("Error al agregar tarea");
        }
        setLoading(false);
    };

    return (
        <Stack spacing={2} sx={{ my: 3 }}>
            {error && <Alert severity="error">{error}</Alert>}

            <TextField
                label="Título"
                value={title}
                onChange={e => setTitle(e.target.value)}
                fullWidth
                placeholder="Escribe el título de la tarea"
            />
            <TextField
                label="Descripción"
                value={description}
                onChange={e => setDescription(e.target.value)}
                fullWidth
                placeholder="Opcional: detalles sobre la tarea"
                multiline
                rows={3}
            />

            <Button
                onClick={submit}
                variant="contained"
                color="primary"
                disabled={loading}
            >
                {loading ? "Agregando..." : "Agregar tarea"}
            </Button>
        </Stack>
    );
}
