import { palette } from "../../theme";
import { SectionLabel } from "../SectionLabel";
import type { Week } from "../../types";

interface Props {
  weeks: Week[];
}

export function WeeksTab({ weeks }: Props) {
  return (
    <div>
      <SectionLabel>4-Week Wave</SectionLabel>
      <p style={{ color: palette.muted, fontSize: 13, lineHeight: 1.7, marginBottom: 26 }}>
        Build for three weeks, then pull back. The deload isn't optional — it's where adaptation happens. Skipping it is how you plateau or get hurt.
      </p>
      {weeks.map((w, i) => (
        <div
          key={i}
          style={{
            borderLeft: `3px solid ${i === 3 ? palette.gold : i === 2 ? palette.accent : palette.dimmer}`,
            padding: "14px 18px",
            marginBottom: 10,
            background: palette.surface,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div style={{ fontFamily: "'Courier New', monospace", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: palette.accent }}>
              Week {w.week}{i === 3 ? " — Deload" : ""}
            </div>
            <div style={{ fontFamily: "'Courier New', monospace", fontSize: 11, color: i === 3 ? palette.gold : palette.muted, letterSpacing: "0.1em" }}>
              {w.feel}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <div style={{ padding: "10px 12px", background: `${palette.accent}11`, border: `1px solid ${palette.accentDim}`, fontSize: 12, color: palette.muted, lineHeight: 1.5 }}>
              <div style={{ color: palette.accent, fontFamily: "'Courier New', monospace", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 4 }}>Day A</div>
              {w.a}
            </div>
            <div style={{ padding: "10px 12px", background: `${palette.gold}11`, border: `1px solid ${palette.gold}44`, fontSize: 12, color: palette.muted, lineHeight: 1.5 }}>
              <div style={{ color: palette.gold, fontFamily: "'Courier New', monospace", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 4 }}>Day B</div>
              {w.b}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
