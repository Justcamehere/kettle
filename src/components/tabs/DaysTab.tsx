import { useState } from "react";
import { palette } from "../../theme";
import { SectionLabel } from "../SectionLabel";
import { ExerciseBlock } from "../ExerciseBlock";
import { SetDialog } from "../SetDialog";
import type { Day, DayKey, SetsState, DialogState } from "../../types";

interface Props {
  days: Record<DayKey, Day>;
  setsState: SetsState;
  onToggleSet: (dayType: DayKey, blockIndex: number, setIndex: number) => void;
  onMarkAllDone: (dayType: DayKey, blockIndex: number) => void;
}

export function DaysTab({ days, setsState, onToggleSet, onMarkAllDone }: Props) {
  const [dayView, setDayView] = useState<DayKey>("A");
  const [dialog, setDialog] = useState<DialogState | null>(null);

  const day = days[dayView];

  const getSets = (dayType: DayKey, blockIndex: number): boolean[] =>
    setsState[`${dayType}:${blockIndex}`] ?? [];

  const isBlockDone = (dayType: DayKey, blockIndex: number): boolean => {
    const sets = getSets(dayType, blockIndex);
    return sets.length > 0 && sets.every(Boolean);
  };

  const completedCount = (dayType: DayKey, blockIndex: number): number =>
    getSets(dayType, blockIndex).filter(Boolean).length;

  const dialogBlock = dialog ? days[dialog.dayType].blocks[dialog.blockIndex] : null;
  const dialogSets = dialog ? getSets(dialog.dayType, dialog.blockIndex) : [];

  return (
    <div>
      <SectionLabel>Sessions</SectionLabel>

      <div style={{ display: "flex", gap: 8, marginBottom: 22 }}>
        {(["A", "B"] as DayKey[]).map((d) => (
          <button
            key={d}
            onClick={() => setDayView(d)}
            style={{
              padding: "9px 18px",
              background: dayView === d ? palette.accent : palette.surface,
              border: `1px solid ${dayView === d ? palette.accent : palette.border}`,
              color: dayView === d ? "#fff" : palette.muted,
              cursor: "pointer",
              fontFamily: "'Courier New', monospace",
              fontSize: 12,
              letterSpacing: "0.1em",
              transition: "all 0.15s",
            }}
          >
            Day {d} — {d === "A" ? "Strength" : "Power"}
          </button>
        ))}
      </div>

      <div style={{ color: palette.muted, fontFamily: "'Courier New', monospace", fontSize: 12, marginBottom: 16 }}>
        {day.days}
      </div>

      <div style={{ background: palette.surface, border: `1px solid ${palette.border}`, padding: "12px 16px", marginBottom: 16 }}>
        <div style={{ color: palette.gold, fontFamily: "'Courier New', monospace", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 5 }}>
          Warm-up
        </div>
        <div style={{ fontSize: 13, color: palette.muted, lineHeight: 1.6 }}>{day.warmup}</div>
      </div>

      <div style={{ color: palette.dimmer, fontFamily: "'Courier New', monospace", fontSize: 11, marginBottom: 12, letterSpacing: "0.05em" }}>
        tap to log sets · hold to mark complete
      </div>

      {day.blocks.map((block, i) => (
        <ExerciseBlock
          key={i}
          block={block}
          completed={completedCount(dayView, i)}
          done={isBlockDone(dayView, i)}
          onPress={() => setDialog({ dayType: dayView, blockIndex: i })}
          onLongPress={() => onMarkAllDone(dayView, i)}
        />
      ))}

      {day.saturdayNote && (
        <div style={{ background: `${palette.gold}11`, border: `1px solid ${palette.gold}33`, padding: "12px 16px", marginTop: 14, fontSize: 13, color: palette.muted, lineHeight: 1.6 }}>
          <div style={{ color: palette.gold, fontFamily: "'Courier New', monospace", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 5 }}>
            Saturday (half-volume)
          </div>
          {day.saturdayNote}
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 14, fontFamily: "'Courier New', monospace", fontSize: 12, color: palette.muted }}>
        Total: {day.total}
      </div>

      {dialog && dialogBlock && (
        <SetDialog
          block={dialogBlock}
          sets={dialogSets}
          onToggle={(setIndex) => onToggleSet(dialog.dayType, dialog.blockIndex, setIndex)}
          onClose={() => setDialog(null)}
        />
      )}
    </div>
  );
}
