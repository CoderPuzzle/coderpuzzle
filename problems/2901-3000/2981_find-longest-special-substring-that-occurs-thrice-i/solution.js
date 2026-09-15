/**
 * @param {string} s
 * @return {number}
 */
var maximumLength = function (s) {
    // The size bound invites brute force: tally every special
    // substring in a hash map, then keep the longest that reached
    // three occurrences.
    const counts = new Map();
    const n = s.length;
    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
            if (s[j] !== s[i]) break;
            const sub = s.slice(i, j + 1);
            counts.set(sub, (counts.get(sub) || 0) + 1);
        }
    }
    let best = -1;
    for (const [sub, c] of counts) {
        if (c >= 3 && sub.length > best) best = sub.length;
    }
    return best;
};
