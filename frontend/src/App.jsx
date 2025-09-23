import { useState } from "react";
import Navbar from "./components/Navbar";
import StudentCard from "./components/StudentCard";

function App() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);

  async function drawStudent() {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/draw`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.picked) {
        setStudent(data.picked);
      } else {
        alert("抽不到學生！");
      }
    } catch (err) {
      console.error(err);
      alert("API 錯誤");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      <Navbar />

      <div className="flex flex-col items-center justify-center flex-1">
        <StudentCard student={student} onDraw={drawStudent} loading={loading} />
      </div>
    </div>
  );
}

export default App;
