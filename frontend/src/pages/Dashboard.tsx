import { Container, Typography, Button, Stack } from "@mui/material";
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
    }, []);

    return (
        <Container>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h4" gutterBottom>Tareas</Typography>
                <Button onClick={logout}>Salir</Button>
            </Stack>

            <TaskForm onCreate={() => setReload(!reload)} />
            <TaskList onChange={() => setReload(!reload)} />
            <Typography variant="h5" mt={4}>Resumen Visual</Typography>
            <TaskChart />
        </Container>
    );
}
