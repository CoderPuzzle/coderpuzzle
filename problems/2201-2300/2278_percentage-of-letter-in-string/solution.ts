function percentageLetter(s: string, letter: string): number {
    // One pass counts the matches; the product stays a small exact integer,
    // so flooring the quotient reproduces rounding down exactly.
    let count = 0;
    for (const character of s) {
        if (character === letter) count++;
    }
    return Math.floor((count * 100) / s.length);
}
