import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges tailwind classes with clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
