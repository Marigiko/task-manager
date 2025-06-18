import { useEffect, useState } from "react";
import { Task } from "../types";
import { Button, Card, CardContent, Typography, MenuItem, Select } from "@mui/material";
import api from "../api/axios";

export default function TaskList({ onChange }: { onChange: () => void }) {
    const [tasks, setTasks] = useState<Task[]>([]);

    const fetchTasks = async () => {
        const username = localStorage.getItem("username");
        const res = await api.get("/tasks/", { params: { username } });
        setTasks(res.data);
    };

    const updateStatus = async (id: string, status: string) => {
        await api.patch(`/tasks/${id}`, { status });
        onChange();
    };

    const remove = async (id: string) => {
        await api.delete(`/tasks/${id}`);
        onChange();
    };

    useEffect(() => { fetchTasks(); }, [onChange]);

    return (
        <>
            {tasks.map(task => (
                <Card key={task.id} sx={{ margin: 2 }}>
                    <CardContent>
                        <Typography variant="h6">{task.title}</Typography>
                        <Typography>{task.description}</Typography>
                        <Select value={task.status} onChange={e => updateStatus(task.id, e.target.value)}>
                            <MenuItem value="por hacer">Por Hacer</MenuItem>
                            <MenuItem value="en progreso">En Progreso</MenuItem>
                            <MenuItem value="completada">Completada</MenuItem>
                        </Select>
                        <Button color="error" onClick={() => remove(task.id)}>Eliminar</Button>
                    </CardContent>
                </Card>
            ))}
        </>
    );
}
