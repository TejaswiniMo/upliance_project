import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "react-spring";
// import { button } from "./ui/button";
import { useAuth } from "../contexts/AuthContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import UserDataForm from "./UserDataForm";

export default function Dashboard() {
  const [count, setCount] = useState(0);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const { currentUser, signOut } = useAuth();

  const props = useSpring({
    height: `${count * 10}px`,
    backgroundColor: `hsl(${count * 10}, 80%, 50%)`,
    config: { tension: 300, friction: 10 },
  });

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => Math.max(0, prev - 1));
  const reset = () => setCount(0);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/signin");
    } catch (error) {
      console.error("Failed to sign out", error);
    }
  };

  const handleUserDataUpdate = (newData) => {
    setUserData(newData);
  };

  const chartData = [
    { name: "Count", value: count },
    { name: "Form Fields", value: userData ? Object.keys(userData).length : 0 },
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Counter</h2>
        <div className="relative w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
          <animated.div style={props} className="absolute bottom-0 left-0 right-0" />
        </div>
        <div className="flex justify-center space-x-4 mt-4">
          <button onClick={decrement}>Decrement</button>
          <button onClick={increment}>Increment</button>
          <button onClick={reset} variant="outline">
            Reset
          </button>
        </div>
        <p className="text-center mt-4">Count: {count}</p>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">User Profile</h2>
        <UserDataForm initialData={userData} onUpdate={handleUserDataUpdate} />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Data Visualization</h2>
        <BarChart width={600} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
}