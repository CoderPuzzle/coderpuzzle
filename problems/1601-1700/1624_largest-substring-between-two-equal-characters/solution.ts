function maxLengthBetweenEqualCharacters(s: string): number {
    // Only a character's first and last occurrence can bound the widest gap
    // for that character, so a single pass recording first-seen indices is
    // enough.
    const first = new Map<string, number>();
    let best = -1;
    for (let index = 0; index < s.length; ++index) {
        const c = s[index];
        if (!first.has(c)) {
            first.set(c, index);
        } else {
            best = Math.max(best, index - (first.get(c) as number) - 1);
        }
    }
    return best;
}
