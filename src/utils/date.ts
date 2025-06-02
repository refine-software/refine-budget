import { parse, isValid } from "date-fns";

export function dateConversion(str: string): Date | null {
	const format = "dd/MM/yyyy, HH:mm:ss";

	const date = parse(str, format, new Date());

	if (!isValid(date)) {
		return null;
	}
	return date;
}
