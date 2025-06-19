import { Container, Typography, Button, Stack, Box } from "@mui/material";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import TaskChart from "../components/TaskChart";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [reload, setReload] = useState(false);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
        }
    }, [navigate]);

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" fontWeight="700">Panel de Tareas</Typography>
                <Button variant="outlined" color="error" onClick={logout}>Salir</Button>
            </Stack>

            <TaskForm onCreate={() => setReload(!reload)} />

            <TaskList onChange={() => setReload(!reload)} />

            <Box mt={5}>
                <Typography variant="h5" mb={2}>Resumen Visual</Typography>
                <TaskChart key={reload.toString()} />
            </Box>
        </Container>
    );
}
