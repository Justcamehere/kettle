export const palette = {
  bg: "#0f0e0d",
  surface: "#181614",
  border: "#2a2520",
  accent: "#c8392b",
  accentDim: "#7a211a",
  gold: "#b8922a",
  text: "#e8e0d4",
  muted: "#7a6f62",
  dimmer: "#3a342d",
  doneBg: "#0d1f0d",
  doneBorder: "#2d5a2d",
  doneText: "#4a9e4a",
} as const;

export type Palette = typeof palette;
