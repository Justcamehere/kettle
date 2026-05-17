export type SetType = "bilateral" | "ladder" | "emom" | "standard";
export type DayKey = "A" | "B";
export type TabId = "principles" | "days" | "weeks" | "progression";

export interface Principle {
  ru: string;
  en: string;
  note: string;
}

export interface Block {
  name: string;
  sets: string;
  setCount: number;
  setType: SetType;
  note: string;
  time: string;
}

export interface Day {
  label: string;
  days: string;
  warmup: string;
  blocks: Block[];
  saturdayNote?: string;
  total: string;
}

export interface Week {
  week: number;
  a: string;
  b: string;
  feel: string;
}

export interface DialogState {
  dayType: DayKey;
  blockIndex: number;
}

export type SetsState = Record<string, boolean[]>;
