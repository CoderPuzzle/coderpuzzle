function lexGreaterPermutation(s: string, target: string): string {
    const base = "a".charCodeAt(0);
    // Counts of the letters still unused while the built prefix keeps
    // matching target position by position.
    const freq: number[] = new Array(26).fill(0);
    for (let i = 0; i < s.length; i++) {
        freq[s.charCodeAt(i) - base]++;
    }
    // The most recent position where a letter strictly greater than
    // target[i] was still available: that bump point plus the count
    // snapshot taken there is the best fallback completion.
    let bumpAt = -1;
    let bumpCh = "";
    let bumpFreq: number[] | null = null;
    for (let i = 0; i < target.length; i++) {
        const ci = target.charCodeAt(i) - base;
        for (let d = ci + 1; d < 26; d++) {
            if (freq[d] > 0) {
                bumpAt = i;
                bumpCh = String.fromCharCode(base + d);
                bumpFreq = freq.slice();
                break;
            }
        }
        if (freq[ci] === 0) {
            break;
        }
        freq[ci]--;
    }
    if (bumpAt < 0) {
        return "";
    }
    // Matched prefix, then the bump letter, then everything left in
    // ascending order — the smallest tail this multiset allows.
    const parts: string[] = [target.slice(0, bumpAt), bumpCh];
    bumpFreq[bumpCh.charCodeAt(0) - base]--;
    for (let d = 0; d < 26; d++) {
        if (bumpFreq[d] > 0) {
            parts.push(String.fromCharCode(base + d).repeat(bumpFreq[d]));
        }
    }
    return parts.join("");
}
