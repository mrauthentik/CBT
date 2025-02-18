import React from "react";
import {LineChart, Line, XAxis,YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from "recharts"

interface ProgressData {
    date: string;
    score: number
}

const UserProgressChart: React.FC<{ data: ProgressData[]}> = ({data}) =>{

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type='monotone' dataKey="score"  stroke="#8884d8" strokeWidth={2} />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default UserProgressChart