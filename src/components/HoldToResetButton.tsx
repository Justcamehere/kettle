import { useRef, useState } from "react";
import { palette } from "../theme";

interface Props {
  label: string;
  onComplete: () => void;
  durationMs?: number;
}

export function HoldToResetButton({ label, onComplete, durationMs = 900 }: Props) {
  const [holding, setHolding] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const start = () => {
    setHolding(true);
    timerRef.current = setTimeout(() => {
      setHolding(false);
      onComplete();
    }, durationMs);
  };

  const cancel = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setHolding(false);
  };

  return (
    <button
      onPointerDown={start}
      onPointerUp={cancel}
      onPointerLeave={cancel}
      onPointerCancel={cancel}
      onContextMenu={(e) => e.preventDefault()}
      style={{
        position: "relative",
        padding: "7px 14px",
        background: "transparent",
        border: `1px solid ${holding ? palette.accent : palette.border}`,
        color: holding ? "#fff" : palette.muted,
        cursor: "pointer",
        fontFamily: "'Courier New', monospace",
        fontSize: 11,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        overflow: "hidden",
        userSelect: "none",
        WebkitUserSelect: "none",
        touchAction: "none",
        transition: "color 0.15s, border-color 0.15s",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: palette.accent,
          transformOrigin: "left center",
          transform: `scaleX(${holding ? 1 : 0})`,
          transition: holding
            ? `transform ${durationMs}ms linear`
            : "transform 0.15s ease-out",
          pointerEvents: "none",
        }}
      />
      <span style={{ position: "relative" }}>{label}</span>
    </button>
  );
}
