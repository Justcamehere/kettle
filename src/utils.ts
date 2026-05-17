import type { SetType } from "./types";

export const getToday = (): string =>
  new Date().toISOString().split("T")[0];

export const makeLabels = (count: number, type: SetType): string[] => {
  if (type === "bilateral") {
    const labels: string[] = [];
    for (let i = 0; i < count; i += 2) {
      const n = i / 2 + 1;
      labels.push(`L${n}`, `R${n}`);
    }
    return labels;
  }
  if (type === "ladder")
    return Array.from({ length: count }, (_, i) => `Ladder ${i + 1}`);
  if (type === "emom")
    return Array.from({ length: count }, (_, i) => `R${i + 1}`);
  return Array.from({ length: count }, (_, i) => `Set ${i + 1}`);
};
