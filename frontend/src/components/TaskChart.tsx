import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { Task } from "../types";
import api from "../api/axios";

const COLORS = ["#FFBB28", "#00C49F", "#FF8042"];

export default function TaskChart() {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const username = localStorage.getItem("username");
            const res = await api.get("/tasks/", { params: { username } });
            const grouped = {
                "por hacer": 0,
                "en progreso": 0,
                "completada": 0,
            };
            res.data.forEach((task: Task) => grouped[task.status]++);
            setData(Object.entries(grouped).map(([name, value]) => ({ name, value })));
        };
        fetchData();
    }, []);

    return (
        <PieChart width={400} height={300}>
            <Pie dataKey="value" data={data} cx="50%" cy="50%" outerRadius={80} label>
                {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Tooltip />
        </PieChart>
    );
}
