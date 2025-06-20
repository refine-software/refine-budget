export function dateConversion(str: string): Date {
	const dateAsNumber = Date.parse(str);
	const date = new Date(dateAsNumber);
	console.log(" dateAsNumber", dateAsNumber);
	console.log("str", str);
	return date;
}
