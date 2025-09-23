import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">行政法抽抽樂</a>
      </div>
      <div className="flex-none flex items-center gap-4">
        {/* 深淺色切換器 */}
        <label className="flex items-center cursor-pointer gap-2">
          {/* 太陽 icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>

          <input
            type="checkbox"
            value="dark"
            className="toggle toggle-sm toggle-primary theme-controller rounded-full"
          />

          {/* 月亮 icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </label>

        {/* 政治系網站 icon */}
        <a
          href="https://polisci.xxx.edu.tw" // 這裡換成真實的網址
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost"
        >
          <FontAwesomeIcon icon={faGlobe} size="lg" />
        </a>
      </div>
    </div>
  );
}
