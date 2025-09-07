import React, { useState, useEffect } from "react";
import { AlertTriangle, CheckCircle } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  console.log("Dashboard component rendered");
  const [rockfallDetected, setRockfallDetected] = useState(false);
  const [riskLevel, setRiskLevel] = useState("Safe");
  const [sensorData, setSensorData] = useState([]);

  // Simulated sensor data updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newData = {
        time: new Date().toLocaleTimeString(),
        rainfall: Math.floor(Math.random() * 50),
        vibration: Math.random().toFixed(2),
        tilt: (Math.random() * 10).toFixed(2),
        pressure: Math.floor(Math.random() * 100),
      };
      setSensorData((prev) => [...prev.slice(-9), newData]);

      // Simple risk logic for demo
      if (newData.rainfall > 30 && newData.vibration > 0.5) {
        setRiskLevel("High Risk");
      } else if (newData.rainfall > 20 || newData.vibration > 0.3) {
        setRiskLevel("Medium Risk");
      } else {
        setRiskLevel("Safe");
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* YOLO Rockfall Detection */}
      <div className="border rounded-xl p-4 shadow bg-white">
        <h2 className="text-xl font-bold mb-2">YOLO Rockfall Detection</h2>
        <div className="border h-64 flex items-center justify-center bg-gray-50">
          {rockfallDetected ? (
            <AlertTriangle className="text-red-600 w-16 h-16" />
          ) : (
            <CheckCircle className="text-green-600 w-16 h-16" />
          )}
        </div>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
          onClick={() => setRockfallDetected(!rockfallDetected)}
        >
          {rockfallDetected ? "Simulate No Rockfall" : "Simulate Rockfall"}
        </button>
      </div>

      {/* Sensor Data + Random Forest Prediction */}
      <div className="border rounded-xl p-4 shadow bg-white">
        <h2 className="text-xl font-bold mb-2">Sensor Data & Prediction</h2>
        <div className="h-64">
          {sensorData.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              Loading sensor data...
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sensorData}>
                <XAxis dataKey="time" />
                <YAxis />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Tooltip />
                <Line type="monotone" dataKey="rainfall" stroke="#8884d8" />
                <Line type="monotone" dataKey="vibration" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className="mt-4">
          <p className="text-lg">
            Predicted Risk Level:{" "}
            <b
              className={
                riskLevel === "High Risk"
                  ? "text-red-600"
                  : riskLevel === "Medium Risk"
                  ? "text-yellow-600"
                  : "text-green-600"
              }
            >
              {riskLevel}
            </b>
          </p>
        </div>
      </div>

      {/* Decision Engine */}
      <div className="md:col-span-2 border rounded-xl p-4 shadow bg-white">
        <h2 className="text-xl font-bold mb-2">Decision Engine (Fusion Layer)</h2>
        {rockfallDetected && riskLevel === "High Risk" ? (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg font-bold">
            ⚠️ Immediate Alert: Rockfall detected + slope instability risk!
          </div>
        ) : rockfallDetected ? (
          <div className="bg-yellow-100 text-yellow-700 p-4 rounded-lg font-bold">
            ⚠️ Rockfall detected, monitoring sensors closely.
          </div>
        ) : (
          <div className="bg-green-100 text-green-700 p-4 rounded-lg font-bold">
            ✅ No rockfall detected. Current risk level: {riskLevel}
          </div>
        )}
      </div>

      {/* Explanation Panel */}
      <div className="md:col-span-2 border rounded-xl p-4 shadow bg-white">
        <h2 className="text-xl font-bold mb-2">System Explanation</h2>
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li>
            <b>YOLO</b>: Detects rock movement from video in real-time.
          </li>
          <li>
            <b>Sensors</b>: Monitor rainfall, vibration, slope tilt, water pressure.
          </li>
          <li>
            <b>Random Forest</b>: Predicts slope risk using sensor data.
          </li>
          <li>
            <b>Fusion Layer</b>: Combines YOLO + Random Forest for final decision.
          </li>
          <li>
            <b>Alerts</b>: Sends warnings when risk is high or rockfall is detected.
          </li>
        </ul>
      </div>
    </div>
  );
}
