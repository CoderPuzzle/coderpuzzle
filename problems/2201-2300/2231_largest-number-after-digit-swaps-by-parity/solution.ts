function largestInteger(num: number): number {
    const digits = Array.from(String(num));
    const odds: string[] = [];
    const evens: string[] = [];
    for (const ch of digits) {
        (Number(ch) % 2 === 1 ? odds : evens).push(ch);
    }
    odds.sort((a, b) => Number(b) - Number(a));
    evens.sort((a, b) => Number(b) - Number(a));
    let oddIndex = 0;
    let evenIndex = 0;
    const out = digits.map((ch) => (Number(ch) % 2 === 1 ? odds[oddIndex++] : evens[evenIndex++]));
    return Number(out.join(""));
}
