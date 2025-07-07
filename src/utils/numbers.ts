export function readableNumber(num: number | undefined): string {
    if (num === undefined) return "0";
    const str = num.toString();

    if (str.length <= 3) return str;

    const readableNumber: string[] = [];
    let counter: number = 0;
    for (let i = str.length - 1; i >= 0; i--) {
        if (counter === 3) {
            if (str[i] !== "-") readableNumber.unshift(",");
            counter = 0;
        }
        readableNumber.unshift(str[i]);
        counter++;
    }

    return readableNumber.join("");
}