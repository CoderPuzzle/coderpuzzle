function maxSubstringLength(s: string): number {
    const n = s.length;
    const base = 97;
    const first = new Map<number, number>();
    const last = new Map<number, number>();
    const counts: number[][] = [];
    counts.push(new Array(26).fill(0));
    for (let i = 0; i < n; i++) {
        const code = s.charCodeAt(i);
        const d = code - base;
        const row = counts[counts.length - 1].slice();
        row[d]++;
        counts.push(row);
        if (!first.has(code)) {
            first.set(code, i);
        }
        last.set(code, i);
    }

    // A self-contained window always starts at the first occurrence of
    // its own leading character, so only those positions are anchors.
    let best = -1;
    const anchors = [...new Set(first.values())];
    for (const l of anchors) {
        let r = last.get(s.charCodeAt(l))!;
        while (true) {
            // Stabilize: extend the right end until every letter occurring
            // inside s[l..r] is fully contained there, tracking the
            // earliest first occurrence among its letters.
            let minFirst = n;
            while (true) {
                let newR = r;
                minFirst = n;
                for (let d = 0; d < 26; d++) {
                    if (counts[r + 1][d] - counts[l][d] > 0) {
                        const c = base + d;
                        if (last.get(c)! > newR) {
                            newR = last.get(c)!;
                        }
                        if (first.get(c)! < minFirst) {
                            minFirst = first.get(c)!;
                        }
                    }
                }
                if (newR === r) {
                    break;
                }
                r = newR;
            }
            if (minFirst >= l && !(l === 0 && r === n - 1)) {
                const length = r - l + 1;
                if (length > best) {
                    best = length;
                }
            }
            if (r === n - 1) {
                break;
            }
            // Absorb the next closed block wholesale; unions of
            // consecutive blocks surface as further fixpoints.
            r = last.get(s.charCodeAt(r + 1))!;
        }
    }
    return best;
}
