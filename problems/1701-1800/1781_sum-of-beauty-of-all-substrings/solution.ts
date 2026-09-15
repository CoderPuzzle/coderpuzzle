function beautySum(s: string): number {
    // For each start, grow the substring one character at a time and
    // read every prefix's beauty straight off a running count array:
    // max frequency minus min nonzero frequency.
    let total = 0;
    const n = s.length;
    for (let i = 0; i < n; i++) {
        const counts: number[] = new Array(26).fill(0);
        for (let j = i; j < n; j++) {
            counts[s.charCodeAt(j) - 97]++;
            let best = 0;
            let least = n;
            for (const c of counts) {
                if (c > best) {
                    best = c;
                }
                if (c > 0 && c < least) {
                    least = c;
                }
            }
            total += best - least;
        }
    }
    return total;
}
