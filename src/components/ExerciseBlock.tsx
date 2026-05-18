import { useRef, useState } from "react";
import { palette } from "../theme";
import type { Block } from "../types";

interface Props {
  block: Block;
  completed: number;
  done: boolean;
  onPress: () => void;
  onLongPress: () => void;
}

const HOLD_MS = 600;

export function ExerciseBlock({
  block,
  completed,
  done,
  onPress,
  onLongPress,
}: Props) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const suppressRef = useRef(false);
  const [holding, setHolding] = useState(false);

  const handlePointerDown = () => {
    suppressRef.current = false;
    setHolding(true);
    timerRef.current = setTimeout(() => {
      suppressRef.current = true;
      setHolding(false);
      onLongPress();
    }, HOLD_MS);
  };

  const handlePointerUp = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setHolding(false);
  };

  const handleClick = () => {
    if (suppressRef.current) {
      suppressRef.current = false;
      return;
    }
    onPress();
  };

  const pct = block.setCount > 0 ? (completed / block.setCount) * 100 : 0;

  return (
    <div
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      style={{
        position: "relative",
        border: `1px solid ${done ? palette.doneBorder : palette.border}`,
        marginBottom: 10,
        overflow: "hidden",
        cursor: "pointer",
        transition: "border-color 0.4s",
        userSelect: "none",
        WebkitUserSelect: "none",
        touchAction: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: palette.doneBorder,
          transformOrigin: "left center",
          transform: `scaleX(${holding ? 1 : 0})`,
          transition: holding
            ? `transform ${HOLD_MS}ms linear`
            : "transform 0.15s ease-out",
          pointerEvents: "none",
          opacity: 0.55,
          zIndex: 0,
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          padding: "14px 16px 12px",
          background: done ? palette.doneBg : palette.surface,
          transition: "background 0.4s",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 15,
              fontWeight: "bold",
              marginBottom: 3,
              color: done ? palette.doneText : palette.text,
              transition: "color 0.4s",
            }}
          >
            {block.name}
          </div>
          <div
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: 11,
              color: done ? palette.doneText : palette.accent,
              letterSpacing: "0.05em",
              transition: "color 0.4s",
            }}
          >
            {block.sets}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 4,
            marginLeft: 12,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: 11,
              color: palette.muted,
            }}
          >
            {block.time}
          </div>
          <div
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: 11,
              color: done ? palette.doneText : palette.muted,
              transition: "color 0.4s",
            }}
          >
            {done ? "✓ done" : `${completed}/${block.setCount}`}
          </div>
        </div>
      </div>

      <div style={{ height: 2, background: palette.dimmer }}>
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: done ? palette.doneText : palette.accent,
            transition: "width 0.25s, background 0.4s",
          }}
        />
      </div>

      <div
        style={{
          padding: "10px 16px 12px",
          fontSize: 12,
          color: palette.muted,
          lineHeight: 1.7,
          background: done ? `${palette.doneBg}cc` : "transparent",
          transition: "background 0.4s",
        }}
      >
        {block.note}
      </div>
    </div>
  );
}
