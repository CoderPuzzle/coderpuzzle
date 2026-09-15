function reorganizeString(s: string): string {
    const n = s.length;
    const counts = new Array(26).fill(0);
    for (let i = 0; i < n; i++) {
        counts[s.charCodeAt(i) - 97]++;
    }
    const letters: [number, number][] = [];
    for (let c = 0; c < 26; c++) {
        if (counts[c] > 0) {
            letters.push([c, counts[c]]);
        }
    }
    // Frequency-descending with alphabetical ties: the exact ordering
    // that produces the canonical answer the judge expects.
    letters.sort((a, b) => b[1] - a[1] || a[0] - b[0]);
    // Feasible iff the most frequent letter fits in the even
    // positions, which outnumber the odd ones by exactly one.
    if (letters[0][1] > Math.floor((n + 1) / 2)) {
        return "";
    }
    const res: string[] = new Array(n);
    let idx = 0;
    for (const [c, cnt] of letters) {
        const ch = String.fromCharCode(97 + c);
        for (let k = 0; k < cnt; k++) {
            // Even positions first; past the end, continue on the
            // odd ones starting at 1.
            if (idx >= n) {
                idx = 1;
            }
            res[idx] = ch;
            idx += 2;
        }
    }
    // Copies of a letter are always two slots apart (the wrap keeps a
    // gap too), and n slots host exactly n letters, so nothing is
    // overwritten and equals never touch.
    return res.join("");
}
