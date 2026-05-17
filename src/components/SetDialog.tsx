import { palette } from "../theme";
import type { Block } from "../types";
import { makeLabels } from "../utils";

interface Props {
  block: Block;
  sets: boolean[];
  onToggle: (index: number) => void;
  onClose: () => void;
}

export function SetDialog({ block, sets, onToggle, onClose }: Props) {
  const labels = makeLabels(block.setCount, block.setType);
  const completedCount = sets.filter(Boolean).length;
  const allDone = sets.length > 0 && sets.every(Boolean);
  const pct = sets.length > 0 ? (completedCount / sets.length) * 100 : 0;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.82)",
        zIndex: 100,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: palette.surface,
          border: `1px solid ${palette.border}`,
          borderBottom: "none",
          width: "100%",
          maxWidth: 480,
          maxHeight: "78vh",
          display: "flex",
          flexDirection: "column",
          borderRadius: "12px 12px 0 0",
        }}
      >
        {/* Drag handle */}
        <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 6px" }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: palette.dimmer }} />
        </div>

        {/* Header */}
        <div
          style={{
            padding: "8px 20px 14px",
            borderBottom: `1px solid ${palette.border}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            <div style={{ fontSize: 17, fontWeight: "bold", marginBottom: 4 }}>
              {block.name}
            </div>
            <div
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: 12,
                color: allDone ? palette.doneText : palette.accent,
                letterSpacing: "0.05em",
                transition: "color 0.3s",
              }}
            >
              {block.sets}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: palette.muted,
              fontSize: 26,
              cursor: "pointer",
              lineHeight: 1,
              padding: "0 0 0 16px",
              marginTop: -2,
            }}
          >
            ×
          </button>
        </div>

        {/* Progress bar */}
        <div style={{ height: 2, background: palette.dimmer, flexShrink: 0 }}>
          <div
            style={{
              height: "100%",
              width: `${pct}%`,
              background: allDone ? palette.doneText : palette.accent,
              transition: "width 0.2s, background 0.3s",
            }}
          />
        </div>

        {/* Set buttons */}
        <div style={{ overflowY: "auto", padding: "16px 16px 8px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(72px, 1fr))",
              gap: 8,
            }}
          >
            {sets.map((done, i) => (
              <button
                key={i}
                onClick={() => onToggle(i)}
                style={{
                  padding: "14px 6px 12px",
                  background: done ? palette.doneBg : palette.bg,
                  border: `1px solid ${done ? palette.doneBorder : palette.border}`,
                  color: done ? palette.doneText : palette.muted,
                  fontFamily: "'Courier New', monospace",
                  fontSize: 12,
                  letterSpacing: "0.05em",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  textAlign: "center",
                  lineHeight: 1,
                }}
              >
                <div>{labels[i]}</div>
                <div style={{ fontSize: 16, marginTop: 6, opacity: done ? 1 : 0.15 }}>✓</div>
              </button>
            ))}
          </div>
        </div>

        {/* Completion message */}
        <div
          style={{
            padding: "10px 16px 24px",
            textAlign: "center",
            fontFamily: "'Courier New', monospace",
            fontSize: 12,
            letterSpacing: "0.12em",
            color: allDone ? palette.doneText : "transparent",
            transition: "color 0.35s",
          }}
        >
          ALL SETS COMPLETE
        </div>
      </div>
    </div>
  );
}
