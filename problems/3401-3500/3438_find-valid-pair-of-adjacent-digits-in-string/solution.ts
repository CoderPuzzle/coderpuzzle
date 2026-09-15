function findValidPair(s: string): string {
    // A digit's validity never depends on where it sits, only on how often
    // it occurs in the whole string, so one counting pass settles every
    // question the scan will ask.
    const counts: number[] = new Array(10).fill(0);
    for (let i = 0; i < s.length; ++i) {
        counts[s.charCodeAt(i) - 48] += 1;
    }
    for (let i = 0; i + 1 < s.length; ++i) {
        const a = s.charCodeAt(i) - 48;
        const b = s.charCodeAt(i + 1) - 48;
        // Valid when the digits differ and each occurs exactly as many
        // times as its numeric value.
        if (a !== b && counts[a] === a && counts[b] === b) {
            return s[i] + s[i + 1];
        }
    }
    return "";
}
