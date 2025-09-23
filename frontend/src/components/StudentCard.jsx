import { maskName } from "../utils/maskName";

export default function StudentCard({ student, onDraw, loading }) {
  return (
    <div className="card w-96 bg-base-100 shadow-sm">
      <div className="card-body items-center text-center">
        <h2 className="card-title">
          {student ? maskName(student.name) : "尚未抽出學生"}
        </h2>
        <p>{student ? `學號：${student.id}` : "請按下按鈕抽學生"}</p>
        <div className="card-actions justify-end">
          <button
            className={`btn btn-primary text-white ${loading ? "loading" : ""}`}
            onClick={onDraw}
            disabled={loading}
          >
            {loading ? "抽籤中..." : "抽學生"}
          </button>
        </div>
      </div>
    </div>
  );
}
