function romanToInt(s: string): number {
    // One left-to-right pass: every symbol contributes its value, except
    // the left half of a subtractive pair, which is taken away instead.
    const values: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
    let total = 0;
    for (let i = 0; i < s.length; ++i) {
        const value = values[s[i]];
        // A value smaller than its right neighbor marks one of the six
        // subtractive pairs (IV, IX, XL, XC, CD, CM): the pair is worth
        // right - left, so this symbol is subtracted rather than added.
        // The last symbol has no right neighbor and is always added.
        if (i + 1 < s.length && value < values[s[i + 1]]) {
            total -= value;
        } else {
            total += value;
        }
    }
    return total;
}
