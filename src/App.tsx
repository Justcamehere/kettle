import { useState, useEffect } from "react";
import { palette } from "./theme";
import { getToday } from "./utils";
import { loadSets, saveSets } from "./storage";
import { PrinciplesTab } from "./components/tabs/PrinciplesTab";
import { DaysTab } from "./components/tabs/DaysTab";
import { WeeksTab } from "./components/tabs/WeeksTab";
import { ProgressionTab } from "./components/tabs/ProgressionTab";
import type { DayKey, TabId, SetsState } from "./types";

import principlesData from "./data/principles.json";
import daysData from "./data/days.json";
import weeksData from "./data/weeks.json";
import progressionData from "./data/progression.json";

const TABS: { id: TabId; label: string }[] = [
  { id: "days", label: "Training Days" },
  { id: "weeks", label: "4-Week Wave" },
  { id: "progression", label: "Progression" },
  { id: "principles", label: "Principles" },
];

const SCHEDULE: { day: string; type: DayKey | null }[] = [
  { day: "Mon", type: "A" },
  { day: "Tue", type: null },
  { day: "Wed", type: "B" },
  { day: "Thu", type: null },
  { day: "Fri", type: "A" },
  { day: "Sat", type: "B" },
  { day: "Sun", type: null },
];

export function App() {
  const [tab, setTab] = useState<TabId>("days");
  const [setsState, setSetsState] = useState<SetsState>({});
  const today = getToday();

  useEffect(() => {
    const state: SetsState = {};
    for (const [dt, day] of Object.entries(daysData) as [
      DayKey,
      typeof daysData.A,
    ][]) {
      day.blocks.forEach((block, i) => {
        const stored = loadSets(today, dt, i);
        state[`${dt}:${i}`] = stored ?? Array(block.setCount).fill(false);
      });
    }
    setSetsState(state);
  }, [today]);

  const toggleSet = (dayType: DayKey, blockIndex: number, setIndex: number) => {
    setSetsState((prev) => {
      const key = `${dayType}:${blockIndex}`;
      const next = (prev[key] ?? []).map((v, i) => (i === setIndex ? !v : v));
      saveSets(today, dayType, blockIndex, next);
      return { ...prev, [key]: next };
    });
  };

  const markAllDone = (dayType: DayKey, blockIndex: number) => {
    setSetsState((prev) => {
      const key = `${dayType}:${blockIndex}`;
      const block = daysData[dayType].blocks[blockIndex];
      const current = prev[key] ?? Array(block.setCount).fill(false);
      const allDone = current.length > 0 && current.every(Boolean);
      const next = Array(block.setCount).fill(!allDone) as boolean[];
      saveSets(today, dayType, blockIndex, next);
      return { ...prev, [key]: next };
    });
  };

  return (
    <div
      style={{
        background: palette.bg,
        color: palette.text,
        minHeight: "100vh",
        fontFamily: "'Georgia','Times New Roman',serif",
        paddingBottom: 80,
      }}
    >
      {/* Header */}
      <div
        style={{
          borderBottom: `1px solid ${palette.border}`,
          padding: "40px 40px 32px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse at 20% 50%, ${palette.accentDim}22 0%, transparent 60%)`,
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative" }}>
          <div
            style={{
              fontFamily: "'Courier New',monospace",
              fontSize: 11,
              letterSpacing: "0.25em",
              color: palette.accent,
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Soviet Kettlebell Method · 16 kg · 4 days/week
          </div>
          <h1
            style={{
              fontSize: "clamp(26px,5vw,44px)",
              fontWeight: "normal",
              lineHeight: 1.1,
              margin: "0 0 6px",
              letterSpacing: "-0.01em",
            }}
          >
            Russian General
            <br />
            Fitness Program
          </h1>
          <div
            style={{
              color: palette.muted,
              fontSize: 14,
              fontFamily: "'Courier New',monospace",
              letterSpacing: "0.05em",
            }}
          >
            Intermediate · Single bell · Pavel tradition
          </div>
        </div>
      </div>

      {/* Schedule strip */}
      <div
        style={{
          padding: "14px 40px",
          borderBottom: `1px solid ${palette.border}`,
          display: "flex",
          gap: 6,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {SCHEDULE.map(({ day, type }) => (
          <div
            key={day}
            style={{
              padding: "5px 11px",
              background: type
                ? type === "A"
                  ? `${palette.accent}22`
                  : `${palette.gold}22`
                : "transparent",
              border: `1px solid ${type ? (type === "A" ? palette.accentDim : `${palette.gold}55`) : palette.border}`,
              fontFamily: "'Courier New',monospace",
              fontSize: 11,
              color: type
                ? type === "A"
                  ? palette.accent
                  : palette.gold
                : palette.dimmer,
              letterSpacing: "0.1em",
            }}
          >
            {day}
            {type ? ` ${type}` : ""}
          </div>
        ))}
        <div
          style={{
            marginLeft: 8,
            fontSize: 11,
            color: palette.muted,
            fontFamily: "'Courier New',monospace",
          }}
        >
          <span style={{ color: palette.accent }}>A</span> Strength &nbsp;
          <span style={{ color: palette.gold }}>B</span> Power
        </div>
      </div>

      {/* Nav */}
      <div
        style={{
          display: "flex",
          borderBottom: `1px solid ${palette.border}`,
          overflowX: "auto",
          overflowY: "hidden",
          touchAction: "pan-x",
          overscrollBehaviorX: "contain",
        }}
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              padding: "13px 18px",
              background: "none",
              border: "none",
              borderBottom:
                tab === t.id
                  ? `2px solid ${palette.accent}`
                  : "2px solid transparent",
              color: tab === t.id ? palette.text : palette.muted,
              cursor: "pointer",
              fontFamily: "'Courier New',monospace",
              fontSize: 12,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              transition: "color 0.15s",
              marginBottom: -1,
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "36px 40px 0" }}>
        {tab === "principles" && <PrinciplesTab principles={principlesData} />}
        {tab === "days" && (
          <DaysTab
            days={daysData as Record<DayKey, typeof daysData.A>}
            setsState={setsState}
            onToggleSet={toggleSet}
            onMarkAllDone={markAllDone}
          />
        )}
        {tab === "weeks" && <WeeksTab weeks={weeksData} />}
        {tab === "progression" && (
          <ProgressionTab progression={progressionData} />
        )}
      </div>
    </div>
  );
}
