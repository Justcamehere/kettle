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

const HOLD_MS = 700;
const HOLD_DELAY_MS = 200;
const ANIM_MS = HOLD_MS - HOLD_DELAY_MS;

export function ExerciseBlock({
  block,
  completed,
  done,
  onPress,
  onLongPress,
}: Props) {
  const triggerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animStartRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pressStartRef = useRef<number>(0);
  const justTriggeredRef = useRef(false);
  const suppressRef = useRef(false);
  const [holding, setHolding] = useState(false);
  const [holdColor, setHoldColor] = useState<string>(palette.doneBorder);

  const handlePointerDown = () => {
    suppressRef.current = false;
    justTriggeredRef.current = false;
    pressStartRef.current = Date.now();
    setHoldColor(done ? palette.accent : palette.doneBorder);
    animStartRef.current = setTimeout(() => setHolding(true), HOLD_DELAY_MS);
    triggerRef.current = setTimeout(() => {
      suppressRef.current = true;
      justTriggeredRef.current = true;
      setHolding(false);
      onLongPress();
    }, HOLD_MS);
  };

  const handlePointerUp = () => {
    if (animStartRef.current) {
      clearTimeout(animStartRef.current);
      animStartRef.current = null;
    }
    if (triggerRef.current) {
      clearTimeout(triggerRef.current);
      triggerRef.current = null;
    }
    if (Date.now() - pressStartRef.current >= HOLD_DELAY_MS) {
      suppressRef.current = true;
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
      onPointerCancel={handlePointerUp}
      style={{
        position: "relative",
        border: `1px solid ${done ? palette.doneBorder : palette.border}`,
        marginBottom: 10,
        overflow: "hidden",
        cursor: "pointer",
        transition: "border-color 0.4s",
        userSelect: "none",
        WebkitUserSelect: "none",
        touchAction: "manipulation",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: holdColor,
          transformOrigin: "left center",
          transform: `scaleX(${holding ? 1 : 0})`,
          transition: holding
            ? `transform ${ANIM_MS}ms linear`
            : justTriggeredRef.current
              ? "none"
              : "transform 0.15s ease-out",
          pointerEvents: "none",
          zIndex: 2,
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
