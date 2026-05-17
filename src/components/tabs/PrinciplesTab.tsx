import { palette } from "../../theme";
import { SectionLabel } from "../SectionLabel";
import type { Principle } from "../../types";

interface Props {
  principles: Principle[];
}

export function PrinciplesTab({ principles }: Props) {
  return (
    <div>
      <SectionLabel>Foundations</SectionLabel>
      {principles.map((p, i) => (
        <div
          key={i}
          style={{ borderLeft: `2px solid ${palette.dimmer}`, padding: "14px 18px", marginBottom: 10, transition: "border-color 0.15s" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.borderLeftColor = palette.accent)}
          onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.borderLeftColor = palette.dimmer)}
        >
          <div style={{ color: palette.gold, fontStyle: "italic", fontSize: 13, marginBottom: 3 }}>{p.ru}</div>
          <div style={{ fontSize: 15, fontWeight: "bold", marginBottom: 5 }}>{p.en}</div>
          <div style={{ color: palette.muted, fontSize: 13, lineHeight: 1.6 }}>{p.note}</div>
        </div>
      ))}
    </div>
  );
}
