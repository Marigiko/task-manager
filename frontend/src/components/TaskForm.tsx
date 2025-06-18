import { useState } from "react";
import { TextField, Button } from "@mui/material";
import api from "../api/axios";

export default function TaskForm({ onCreate }: { onCreate: () => void }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const submit = async () => {
        const username = localStorage.getItem("username");
        await api.post("/tasks/", { title, description }, { params: { username } });
        onCreate();
        setTitle(""); setDescription("");
    };

    return (
        <>
            <TextField label="Título" value={title} onChange={e => setTitle(e.target.value)} fullWidth />
            <TextField label="Descripción" value={description} onChange={e => setDescription(e.target.value)} fullWidth />
            <Button onClick={submit} variant="contained" color="primary">Agregar</Button>
        </>
    );
}
