function isFascinating(n: number): boolean {
    const digits = `${n}${2 * n}${3 * n}`;
    if (digits.length !== 9) return false;

    const seen = new Array<boolean>(10).fill(false);
    for (const char of digits) {
        const digit = Number(char);
        if (digit === 0 || seen[digit]) return false;
        seen[digit] = true;
    }
    return true;
}
