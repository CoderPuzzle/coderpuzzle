/**
 * @param {string} s
 * @return {string}
 */
var longestDupSubstring = function (s) {
    const n = s.length;
    // Rank of each suffix by its first character alone; ranks only need
    // relative order, so the letter's alphabet index serves.
    const rank = new Array(n);
    for (let i = 0; i < n; i++) rank[i] = s.charCodeAt(i) - 97;
    const sa = new Array(n);
    for (let i = 0; i < n; i++) sa[i] = i;

    // Doubling sort: after the pass with step k, ranks order prefixes of
    // length 2k, so ceil(log2 n) passes settle the whole suffix order. Each
    // pass sorts on one packed key: the current rank scaled past every
    // possible second component, plus the rank of the suffix k steps later,
    // with 0 standing in for "past the end" so a suffix that is a prefix of
    // a longer one ranks strictly below it.
    const key = new Array(n);
    for (let k = 1; k < n; k *= 2) {
        for (let i = 0; i < n; i++) {
            key[i] = rank[i] * (n + 27) + (i + k < n ? rank[i + k] + 1 : 0);
        }
        sa.sort((x, y) => key[x] - key[y]);
        const next = new Array(n);
        next[sa[0]] = 0;
        let r = 0;
        for (let p = 1; p < n; p++) {
            if (key[sa[p]] !== key[sa[p - 1]]) r++;
            next[sa[p]] = r;
        }
        for (let i = 0; i < n; i++) rank[i] = next[i];
        if (r === n - 1) break; // every suffix distinct — the order is already final
    }

    // Kasai's scan: walk the text positions left to right, matching each
    // suffix against its predecessor in sorted order. Dropping a leading
    // character from both sides of a match shortens it by at most one, so a
    // single extending counter h that only ever retreats by one per step
    // settles every LCP within 2n character comparisons.
    const posOf = new Array(n);
    for (let p = 0; p < n; p++) posOf[sa[p]] = p;
    let bestLength = 0;
    let bestStart = 0;
    let h = 0;
    for (let i = 0; i < n; i++) {
        if (posOf[i] > 0) {
            const j = sa[posOf[i] - 1];
            while (i + h < n && j + h < n && s[i + h] === s[j + h]) h++;
            if (h > bestLength) {
                bestLength = h;
                bestStart = i;
            }
            if (h > 0) h--;
        } else {
            h = 0;
        }
    }

    if (bestLength === 0) return "";
    return s.substring(bestStart, bestStart + bestLength);
};
