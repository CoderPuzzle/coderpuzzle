// At 5*10^5 characters only run-length structure matters: group
// each character's run lengths, keep the top three, and take the
// best of the three ways to place three windows.
function maximumLength(s: string): number {
    const runs: number[][] = Array.from({ length: 26 }, () => []);
    let i = 0;
    const n = s.length;
    while (i < n) {
        let j = i;
        while (j < n && s[j] === s[i]) j++;
        runs[s.charCodeAt(i) - 97].push(j - i);
        i = j;
    }
    let best = -1;
    for (const rs of runs) {
        if (rs.length === 0) continue;
        rs.sort((a, b) => b - a);
        const f1 = rs[0];
        const f2 = rs.length > 1 ? rs[1] : 0;
        const f3 = rs.length > 2 ? rs[2] : 0;
        // three windows in one run / two + one / one in each;
        // a 0 candidate means this character never reaches three.
        const cand = Math.max(f1 - 2, Math.min(f1 - 1, f2), f3);
        if (cand >= 1 && cand > best) best = cand;
    }
    return best;
}
