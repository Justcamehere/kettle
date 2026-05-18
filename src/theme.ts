export const palette = {
  bg: "#0f0e0d",
  surface: "#181614",
  border: "#2a2520",
  accent: "#c8392b",
  accentDim: "#7a211a",
  gold: "#b8922a",
  text: "#e8e0d4",
  muted: "#a89c8c",
  dimmer: "#8a7e6f",
  doneBg: "#0d1f0d",
  doneBorder: "#2d5a2d",
  doneText: "#4a9e4a",
} as const;

export type Palette = typeof palette;
