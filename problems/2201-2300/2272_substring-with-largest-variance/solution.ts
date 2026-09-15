function largestVariance(s: string): number {
    const chars = new Set<string>(s);
    let answer = 0;
    // Variance = max over ordered pairs (high, low) of count(high) -
    // count(low), with both chars present in the substring. Map high to
    // +1, low to -1, everything else to 0, and run Kadane per pair.
    for (const high of chars) {
        for (const low of chars) {
            if (high === low) {
                continue;
            }
            let diff = 0; // max subarray sum ending here (may lack `low`)
            let hasLow = false; // whether diffWithLow has been initialized
            let diffWithLow = 0; // same but guaranteed to contain at least one `low`
            for (let k = 0; k < s.length; k++) {
                const ch = s[k];
                if (ch === high) {
                    diff += 1;
                    if (hasLow) {
                        diffWithLow += 1;
                    }
                } else if (ch === low) {
                    diff -= 1;
                    // Extend the best-with-low through this -1, or graft
                    // the entire no-`low` prefix ending here onto it —
                    // always at least as good as restarting from scratch.
                    if (hasLow) {
                        diffWithLow = Math.max(diffWithLow - 1, diff);
                    } else {
                        // First `low`: initialize with diff (which now
                        // includes this -1) so the low is truly inside.
                        diffWithLow = diff;
                        hasLow = true;
                    }
                    diff = Math.max(0, diff);
                }
                // else: neither char, both values unchanged
                // Only the guaranteed-to-contain-low value is a legal
                // variance candidate.
                if (hasLow && diffWithLow > answer) {
                    answer = diffWithLow;
                }
            }
        }
    }
    return answer;
}
