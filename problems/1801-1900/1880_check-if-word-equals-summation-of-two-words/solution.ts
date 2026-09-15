function isSumEqual(firstWord: string, secondWord: string, targetWord: string): boolean {
    // Letter values are single decimal digits, so a positional fold
    // (v = v*10 + d) reproduces the concatenated-digit integer. Values
    // stay below 1e8, exact as JS numbers.
    const val = (w: string): number => {
        let v = 0;
        for (const ch of w) {
            v = v * 10 + ch.charCodeAt(0) - 97;
        }
        return v;
    };
    return val(firstWord) + val(secondWord) === val(targetWord);
}
