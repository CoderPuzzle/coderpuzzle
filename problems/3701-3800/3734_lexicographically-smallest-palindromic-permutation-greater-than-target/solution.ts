function lexPalindromicPermutation(s: string, target: string): string {
    const base = "a".charCodeAt(0);
    const n = s.length;
    // Counts of each letter of s.
    const freq: number[] = new Array(26).fill(0);
    for (let i = 0; i < n; i++) {
        freq[s.charCodeAt(i) - base]++;
    }
    // Parity law: every count even, or exactly one odd count absorbed by
    // the middle character when n is odd.
    let odds = 0;
    let oddLetter = -1;
    for (let d = 0; d < 26; d++) {
        if (freq[d] % 2 === 1) {
            odds++;
            oddLetter = d;
        }
    }
    if (odds !== n % 2) {
        return "";
    }
    // The half multiset is forced — freq[d] / 2 of every letter — and on
    // odd lengths the odd letter pins the middle, so comparing palindromes
    // reduces to comparing (half, middle, mirrored half).
    const half: number[] = freq.map((f) => Math.floor(f / 2));
    const m = Math.floor(n / 2);
    const p = target.slice(0, m);
    // Candidate 1: keep the half equal to target's own first half p. That
    // pins the entire palindrome, which qualifies only if it already
    // clears target past the shared prefix.
    let best: string | null = null;
    const pc: number[] = new Array(26).fill(0);
    for (let i = 0; i < m; i++) {
        pc[target.charCodeAt(i) - base]++;
    }
    let matches = true;
    for (let d = 0; d < 26; d++) {
        if (pc[d] !== half[d]) {
            matches = false;
        }
    }
    if (matches) {
        const mirrored = p.split("").reverse().join("");
        const suffix = target.slice(m + (n % 2));
        let wins;
        if (n % 2 === 0) {
            wins = mirrored > suffix;
        } else {
            const mid = target.charCodeAt(m) - base;
            wins = oddLetter > mid || (oddLetter === mid && mirrored > suffix);
        }
        if (wins) {
            best = p;
        }
    }
    // Candidate 2: the smallest half arrangement strictly greater than p —
    // match p as far as possible, remembering the latest position where a
    // larger still-available letter existed, and fall back to it.
    if (best === null) {
        const cur = half.slice();
        let bumpAt = -1;
        let bumpCh = -1;
        let bumpCur: number[] | null = null;
        for (let i = 0; i < m; i++) {
            const ci = target.charCodeAt(i) - base;
            for (let d = ci + 1; d < 26; d++) {
                if (cur[d] > 0) {
                    bumpAt = i;
                    bumpCh = d;
                    bumpCur = cur.slice();
                    break;
                }
            }
            if (cur[ci] === 0) {
                break;
            }
            cur[ci]--;
        }
        if (bumpAt >= 0) {
            const parts: string[] = [target.slice(0, bumpAt), String.fromCharCode(base + bumpCh)];
            bumpCur[bumpCh]--;
            for (let d = 0; d < 26; d++) {
                if (bumpCur[d] > 0) {
                    parts.push(String.fromCharCode(base + d).repeat(bumpCur[d]));
                }
            }
            best = parts.join("");
        }
    }
    if (best === null) {
        return "";
    }
    let result = best;
    if (n % 2 === 1) {
        result += String.fromCharCode(base + oddLetter);
    }
    for (let i = m - 1; i >= 0; i--) {
        result += best[i];
    }
    return result;
}
