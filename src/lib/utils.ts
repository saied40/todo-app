import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isNumber(value: unknown): boolean {
  if (typeof value === "number") return true;
  if (value === null || value === undefined || value.toString().trim() === "") return false;
  return !isNaN(Number(value)); // && isFinite(value);
};
