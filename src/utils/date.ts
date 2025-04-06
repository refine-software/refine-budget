export function dateConversion(str: string): Date | null {
    const date = new Date(str);
    if (isNaN(date.getTime())) return null;
    return date;
}
