/**
 * @param {string} s1
 * @param {string} s2
 * @return {string}
 */
var minWindow = function (s1, s2) {
    const n = s1.length;
    const m = s2.length;
    // nxt[i][c] answers "where is the first character c at or after i?" in
    // one lookup: a backward sweep copies each row from its successor and
    // overwrites the column of the character sitting at i; row n is all
    // sentinels, so every failed jump lands on n and ends the walk.
    const nxt = Array.from({ length: n + 1 }, () => new Array(26).fill(n));
    for (let i = n - 1; i >= 0; i--) {
        nxt[i] = nxt[i + 1].slice();
        nxt[i][s1.charCodeAt(i) - 97] = i;
    }
    // A minimum window must open on s2[0] — otherwise its head could be cut
    // for a strictly shorter valid window — so walking from every such opening
    // and always jumping to the earliest continuation visits every candidate.
    // Scanning openings left to right and keeping only strictly shorter
    // windows leaves the leftmost one among equal-length winners.
    let bestLen = n + 1;
    let bestStart = -1;
    for (let i = 0; i < n; i++) {
        if (s1.charCodeAt(i) !== s2.charCodeAt(0)) continue;
        let pos = i;
        let ok = true;
        for (let k = 1; k < m; k++) {
            pos = nxt[pos + 1][s2.charCodeAt(k) - 97];
            if (pos === n) {
                ok = false;
                break;
            }
        }
        if (ok && pos - i + 1 < bestLen) {
            bestLen = pos - i + 1;
            bestStart = i;
            if (bestLen === m) break; // |s2| is the unavoidable lower bound
        }
    }
    return bestStart < 0 ? "" : s1.slice(bestStart, bestStart + bestLen);
};
