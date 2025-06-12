export function dateConversion(str: string): Date {
	const dateAsNumber = Date.parse(str);
	const date = new Date(dateAsNumber);
	return date;
}
