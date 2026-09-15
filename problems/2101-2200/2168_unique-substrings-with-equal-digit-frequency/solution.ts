function equalDigitFrequency(s: string): number {
    // For each start index, extend the substring one digit at a time while
    // tracking digit counts; the running (distinct digits, max frequency)
    // pair tests "every digit appears equally" in O(1) per extension.
    const n = s.length;
    const seen = new Set<string>();
    for (let start = 0; start < n; ++start) {
        const counts = new Array<number>(10).fill(0);
        let distinct = 0;
        let maxCount = 0;
        let piece = "";
        for (let end = start; end < n; ++end) {
            const digit = s.charCodeAt(end) - 48;
            if (counts[digit] === 0) {
                distinct += 1;
            }
            counts[digit] += 1;
            maxCount = Math.max(maxCount, counts[digit]);
            piece += s[end];
            if (maxCount * distinct === end - start + 1) {
                seen.add(piece);
            }
        }
    }
    return seen.size;
}
