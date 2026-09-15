function replaceDigits(s: string): string {
    // shift(c, x) is plain character arithmetic: code of c plus x. Each
    // digit at an odd index pairs with the letter immediately before it.
    const codes = Array.from(s, (c) => c.charCodeAt(0));
    for (let i = 1; i < codes.length; i += 2) {
        codes[i] = codes[i - 1] + (codes[i] - 48);
    }
    return String.fromCharCode(...codes);
}
