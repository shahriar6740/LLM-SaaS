import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formattedFileSize(fileSizeInBytes: number) {
	const fileSizeInMB = (fileSizeInBytes / (1024 * 1024)).toFixed(2);
	if (Number(fileSizeInMB) < 1) {
		const fileSizeInKB = (fileSizeInBytes / 1024).toFixed(2);
		return `${fileSizeInKB} KB`;
	}
	return `${fileSizeInMB} MB`;
}
