// ============================================================
// STUDY MATERIAL COMPONENT — CLEAN + STABLE -- VERSION 2025.8
// MAX 2 ROWS VISIBLE, VIEW-MORE TILE INSIDE GRID
// ============================================================

import { useCallback, useEffect, useState } from "react";
import Lottie from "lottie-react";
import "../styles/StudyMaterial.css";

// ============================================================
// STUDY MATERIAL DATA
// ============================================================
import pythonAnim from "../assets/lotties/python.json";
import sqlAnim from "../assets/lotties/MySQL.json";
import financeAnim from "../assets/lotties/finance.json";
import CSEAnim from "../assets/lotties/cse-basics.json";
import interviewAnim from "../assets/lotties/HR Interview.json"

const studyMaterials = [
  { title: "PYTHON", link: "https://drive.google.com/drive/folders/1IQerh93elt4mBQRdRZ_42yYv4Dv0ipTm", animation: pythonAnim },
  { title: "SQL", link: "https://drive.google.com/drive/folders/1AdrThpT8qlMxuWQenc7LF-ryW4FIpBBx", animation: sqlAnim },
  { title: "FINANCE", link: "https://drive.google.com/drive/folders/1tnPiNCIiElutXDcEveQppmMkbGp1Q8Q1", animation: financeAnim },
  { title: "CSE BASICS", link: "https://drive.google.com/drive/folders/1kgOl_U_rbCHRChY2F6JdCiUW7qsEnaWt", animation: CSEAnim },
  {title: "INTERVIEW Q&A", link: "https://drive.google.com/drive/folders/1CKFBndpl6IafBLBLo4ywFvbi35uMZzGJ", animation: interviewAnim },
];

// ============================================================
// RESPONSIVE COLS HOOK
// ============================================================
function useMaxPerRow() {
  const get = () => {
    const w = window.innerWidth;
    if (w < 640) return 3; // MOBILE
    if (w < 1024) return 4; // TABLET / MEDIUM
    return 5; // LARGE
  };

  const [cols, setCols] = useState(get);

  useEffect(() => {
    const onResize = () => setCols(get());
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return cols;
}

function StudyMaterial() {
  const maxPerRow = useMaxPerRow();

  // maximum cards that fit into 2 rows
  const maxVisible = maxPerRow * 2;

  const showViewMore = studyMaterials.length > maxVisible;

  // cards that will be displayed in grid (leave 1 space if "view more" exists)
  const visibleCards = showViewMore
    ? studyMaterials.slice(0, maxVisible - 1)
    : studyMaterials.slice(0, maxVisible);

  const handleOpenLink = (url) => {
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleViewMore = () => {
    const win = window.open("", "_blank", "noopener,noreferrer");
    if (!win) {
      alert("Please allow popups to view all materials.");
      return;
    }

    const data = JSON.stringify(studyMaterials);

    const html = `
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <title>All Study Materials</title>
          <style>
            :root {
              --bg: #f8fafc;
              --card: #ffffff;
              --text: #111827;
              --shadow: 0 6px 18px rgba(0,0,0,0.1);
              --radius: 16px;
            }
            * { box-sizing: border-box; }
            body { margin: 0; font-family: Inter, system-ui, sans-serif; background: var(--bg); color: var(--text); }
            header { padding: 20px; text-align: center; position: sticky; top: 0; background: var(--bg); }
            h1 { margin: 0; font-size: 24px; }
            .wrap { padding: 24px; max-width: 1280px; margin: 0 auto; }
            .grid { display: grid; gap: 24px; grid-template-columns: repeat(5, 1fr); }
            @media (max-width: 1023.98px) { .grid { grid-template-columns: repeat(4, 1fr); } }
            @media (max-width: 639.98px)  { .grid { grid-template-columns: repeat(3, 1fr); } }
            .card {
              background: var(--card);
              border-radius: var(--radius);
              height: 160px;
              display: flex; align-items: center; justify-content: center;
              text-align: center; padding: 16px;
              box-shadow: var(--shadow);
              cursor: pointer;
              transition: transform .2s ease, box-shadow .2s ease;
            }
            .card:hover { transform: translateY(-4px); box-shadow: 0 10px 25px rgba(0,0,0,.15); }
            .title { font-weight: 700; }
          </style>
        </head>
        <body>
          <header><h1>All Study Materials</h1></header>
          <div class="wrap">
            <div class="grid" id="grid"></div>
          </div>
          <script>
            const materials = ${data};
            const grid = document.getElementById("grid");
            materials.forEach(m => {
              const card = document.createElement("div");
              card.className = "card";
              card.innerHTML = '<div class="title">'+m.title+'</div>';
              card.onclick = () => window.open(m.link, "_blank", "noopener,noreferrer");
              grid.appendChild(card);
            });
          </script>
        </body>
      </html>
    `;

    win.document.open();
    win.document.write(html);
    win.document.close();
  };

  return (
    <section id="study-material" className="study-material">
      <h2 className="study-title">📚 Study Materials</h2>

      {/* GRID */}
      <div
        className="study-grid"
        style={{ gridTemplateColumns: `repeat(${maxPerRow}, 1fr)` }}
      >
        {visibleCards.map((item, idx) => (
          <button
            key={`${item.title}-${idx}`}
            className="study-card"
            onClick={() => handleOpenLink(item.link)}
          >
            <div className="study-animation">
              <Lottie animationData={item.animation} loop />
            </div>
            <span className="study-label">{item.title}</span>
          </button>
        ))}

        {/* VIEW-MORE TILE */}
        {showViewMore && (
          <button
            id="view-more-card"
            className="study-card"
            onClick={handleViewMore}
          >
            <div className="study-animation" style={{ fontSize: 28, fontWeight: 800 }}>
              ＋
            </div>
            <span className="study-label">View More</span>
          </button>
        )}
      </div>
    </section>
  );
}

export default StudyMaterial;
