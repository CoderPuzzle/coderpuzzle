function longestPalindrome(s: string, t: string): number {
    const n = s.length;
    const m = t.length;
    // p[i] = longest palindrome starting at s[i]; rolling interval table
    // fills every row bottom-up in O(n^2) time and O(n) space.
    const p: number[] = new Array(n).fill(1);
    let below: boolean[] = new Array(n + 1).fill(false);
    for (let i = n - 1; i >= 0; --i) {
        const row: boolean[] = new Array(n + 1).fill(false);
        row[i] = true;
        let best = 1;
        for (let j = i + 1; j < n; ++j) {
            row[j] = s[i] === s[j] && (j === i + 1 || below[j - 1]);
            if (row[j]) best = j - i + 1;
        }
        p[i] = best;
        below = row;
    }
    // q[j] = longest palindrome ending at t[j]; same fill records the
    // longest length per right end.
    const q: number[] = new Array(m).fill(1);
    below = new Array(m + 1).fill(false);
    for (let i = m - 1; i >= 0; --i) {
        const row: boolean[] = new Array(m + 1).fill(false);
        row[i] = true;
        for (let j = i + 1; j < m; ++j) {
            row[j] = t[i] === t[j] && (j === i + 1 || below[j - 1]);
            if (row[j]) q[j] = j - i + 1;
        }
        below = row;
    }
    let best = 0;
    for (const v of p) if (v > best) best = v;
    for (const v of q) if (v > best) best = v;
    // dp[i][j] = longest palindrome starting with s[i] and ending with t[j].
    // Each cell needs only dp[i+1][j-1], its neighbour on the diagonal i + j,
    // so one scalar walks each diagonal from the far end inward. At the table
    // edge the missing neighbour becomes p[i+1] (no t-part left) or q[j-1]
    // (no s-part left).
    for (let d = 0; d < n + m - 1; ++d) {
        const iHi = d < n ? d : n - 1;
        const iLo = d - m + 1 > 0 ? d - m + 1 : 0;
        const jHi = d - iHi;
        let nxt = 0;
        if (iHi < n - 1) {
            nxt = p[iHi + 1];
        } else if (jHi > 0) {
            nxt = q[jHi - 1];
        }
        for (let i = iHi; i >= iLo; --i) {
            const j = d - i;
            let cur = p[i] > q[j] ? p[i] : q[j];
            if (s[i] === t[j]) {
                const add = nxt + 2;
                if (add > cur) cur = add;
            }
            if (cur > best) best = cur;
            nxt = cur;
        }
    }
    return best;
}
