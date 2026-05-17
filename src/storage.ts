const PREFIX = "kb";

const key = (date: string, dayType: string, blockIndex: number): string =>
  `${PREFIX}:${date}:${dayType}:${blockIndex}`;

export const loadSets = (
  date: string,
  dayType: string,
  blockIndex: number
): boolean[] | null => {
  try {
    const raw = localStorage.getItem(key(date, dayType, blockIndex));
    return raw ? (JSON.parse(raw) as boolean[]) : null;
  } catch {
    return null;
  }
};

export const saveSets = (
  date: string,
  dayType: string,
  blockIndex: number,
  sets: boolean[]
): void => {
  try {
    localStorage.setItem(key(date, dayType, blockIndex), JSON.stringify(sets));
  } catch {
    // Silently fail if storage is unavailable
  }
};
