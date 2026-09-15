function simplifiedFractions(n: number): string[] {
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const result: string[] = [];
    for (let numer = 1; numer < n; numer++) {
        for (let denom = numer + 1; denom <= n; denom++) {
            if (gcd(numer, denom) === 1) {
                result.push(`${numer}/${denom}`);
            }
        }
    }
    return result;
}
