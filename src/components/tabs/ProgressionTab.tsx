import { palette } from "../../theme";
import { SectionLabel } from "../SectionLabel";

interface Props {
  progression: string[];
}

export function ProgressionTab({ progression }: Props) {
  return (
    <div>
      <SectionLabel>Long-term progression</SectionLabel>
      <p style={{ color: palette.muted, fontSize: 13, lineHeight: 1.7, marginBottom: 26 }}>
        The ladder is the engine. Extend the ladder before adding bells. This is how the Soviets built work capacity without burning out lifters.
      </p>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {progression.map((item, i) => (
          <li key={i} style={{ display: "flex", gap: 14, padding: "13px 0", borderBottom: `1px solid ${palette.border}`, fontSize: 14, lineHeight: 1.6, alignItems: "flex-start" }}>
            <span style={{ color: palette.accent, fontFamily: "'Courier New', monospace", fontSize: 12, marginTop: 2, flexShrink: 0 }}>→</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div style={{ marginTop: 36, padding: 18, border: `1px solid ${palette.border}`, background: palette.surface }}>
        <div style={{ color: palette.accent, fontFamily: "'Courier New', monospace", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 10 }}>
          A note on 16 kg
        </div>
        <p style={{ color: palette.muted, fontSize: 13, lineHeight: 1.7, margin: 0 }}>
          The bell doesn't need to feel heavy to work. Pavel built the entire Simple & Sinister system around a single moderate-weight bell. The variables are volume, density, and skill — not load. Respect the bell you have.
        </p>
      </div>
    </div>
  );
}
