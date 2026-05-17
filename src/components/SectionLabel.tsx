import { palette } from "../theme";

interface Props {
  children: React.ReactNode;
}

export function SectionLabel({ children }: Props) {
  return (
    <div
      style={{
        fontFamily: "'Courier New', monospace",
        fontSize: 10,
        letterSpacing: "0.3em",
        color: palette.accent,
        textTransform: "uppercase",
        marginBottom: 22,
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      {children}
      <div style={{ flex: 1, height: 1, background: palette.border }} />
    </div>
  );
}
