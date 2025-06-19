import { useEffect, useState } from "react";
import { Task } from "../types";
import {
    Button,
    Card,
    CardContent,
    Typography,
    Chip,
    Stack,
    IconButton,
    MenuItem,
    Select,
    Dialog,
    DialogTitle,
    DialogActions,
    Snackbar,
    Alert
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import api from "../api/axios";

export default function TaskList({ onChange }: { onChange: () => void }) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({ open: false, message: "", severity: "success" });

    const fetchTasks = async () => {
        try {
            const username = localStorage.getItem("username");
            const res = await api.get("/tasks/", { params: { username } });
            setTasks(res.data);
        } catch {
            setSnackbar({ open: true, message: "Error cargando tareas", severity: "error" });
        }
    };

    const updateStatus = async (id: string, status: string) => {
        try {
            await api.patch(`/tasks/${id}`, { status });
            setSnackbar({ open: true, message: "Estado actualizado", severity: "success" });
            onChange();
        } catch {
            setSnackbar({ open: true, message: "Error actualizando estado", severity: "error" });
        }
    };

    const confirmDelete = (id: string) => setDeletingId(id);
    const cancelDelete = () => setDeletingId(null);

    const remove = async () => {
        if (!deletingId) return;
        try {
            await api.delete(`/tasks/${deletingId}`);
            setSnackbar({ open: true, message: "Tarea eliminada", severity: "success" });
            setDeletingId(null);
            onChange();
        } catch {
            setSnackbar({ open: true, message: "Error eliminando tarea", severity: "error" });
            setDeletingId(null);
        }
    };

    useEffect(() => { fetchTasks(); }, [onChange]);

    const statusColors: Record<string, "default" | "primary" | "warning" | "success" | "error"> = {
        "por hacer": "error",
        "en progreso": "warning",
        "completada": "success"
    };

    console.log("TASKS:", tasks);

    return (
        <>
            {tasks.length === 0 && <Typography sx={{ mt: 2 }} align="center">No hay tareas para mostrar</Typography>}

            <Stack spacing={2} sx={{ mt: 2 }}>
                {tasks.map(task => (
                    <Card key={task._id} variant="outlined" sx={{ p: 2 }}>
                        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <Typography variant="h6" fontWeight="600">{task.title}</Typography>
                            <Typography color="text.secondary">{task.description}</Typography>

                            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 1 }}>
                                <Chip label={task.status} color={statusColors[task.status] || "default"} />

                                <Stack direction="row" spacing={1} alignItems="center">
                                    <Select
                                        size="small"
                                        value={task.status}
                                        onChange={e => updateStatus(task._id, e.target.value)}
                                    >
                                        <MenuItem value="por hacer">Por Hacer</MenuItem>
                                        <MenuItem value="en progreso">En Progreso</MenuItem>
                                        <MenuItem value="completada">Completada</MenuItem>
                                    </Select>

                                    <IconButton aria-label="Eliminar tarea" color="error" onClick={() => confirmDelete(task._id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Card>
                ))}
            </Stack>

            <Dialog open={Boolean(deletingId)} onClose={cancelDelete}>
                <DialogTitle>¿Estás seguro de eliminar esta tarea?</DialogTitle>
                <DialogActions>
                    <Button onClick={cancelDelete}>Cancelar</Button>
                    <Button onClick={remove} color="error">Eliminar</Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar(s => ({ ...s, open: false }))}
            >
                <Alert severity={snackbar.severity} variant="filled" onClose={() => setSnackbar(s => ({ ...s, open: false }))}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
}
