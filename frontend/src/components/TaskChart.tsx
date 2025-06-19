import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Task } from "../types";
import api from "../api/axios";

const COLORS = ["#FF4C4C", "#FFA726", "#66BB6A"]; // rojo, naranja, verde (más vivo)

export default function TaskChart() {
    const [data, setData] = useState<{ name: string; value: number }[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const username = localStorage.getItem("username");
            const res = await api.get("/tasks/", { params: { username } });
            const grouped = {
                "Por Hacer": 0,
                "En Progreso": 0,
                "Completada": 0,
            };
            res.data.forEach((task: Task) => {
                const statusKey = task.status.toLowerCase();
                if (statusKey === "por hacer") grouped["Por Hacer"]++;
                else if (statusKey === "en progreso") grouped["En Progreso"]++;
                else if (statusKey === "completada") grouped["Completada"]++;
            });
            setData(Object.entries(grouped).map(([name, value]) => ({ name, value })));
        };
        fetchData();
    }, []);

    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    dataKey="value"
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    isAnimationActive={true}
                >
                    {data.map((_, i) => (
                        <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip formatter={(value: number) => `${value} tareas`} />
                <Legend verticalAlign="bottom" height={36} />
            </PieChart>
        </ResponsiveContainer>
    );
}
