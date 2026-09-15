/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
    if (t.length === 0 || t.length > s.length) return "";
    // need[c] = copies of c the window still owes; missing = total owed
    // instances, so missing === 0 is an O(1) coverage test.
    const need = new Map();
    for (const ch of t) {
        need.set(ch, (need.get(ch) || 0) + 1);
    }
    let missing = t.length;
    let bestStart = 0,
        bestLen = Infinity;
    let left = 0;
    for (let right = 0; right < s.length; right++) {
        const ch = s[right];
        // need > 0 means this occurrence is genuinely required; the
        // unconditional decrement then drives surplus copies negative
        // without ever touching missing again.
        if ((need.get(ch) || 0) > 0) missing--;
        need.set(ch, (need.get(ch) || 0) - 1);
        if (missing === 0) {
            // Valid window: shed surplus leftmost characters, returning
            // each released copy to the budget, until one sits at quota.
            while (left < right && need.get(s[left]) < 0) {
                need.set(s[left], need.get(s[left]) + 1);
                left++;
            }
            if (right - left + 1 < bestLen) {
                bestStart = left;
                bestLen = right - left + 1;
            }
            // Evict the leftmost required character on purpose so the
            // search owes exactly one instance and scanning can resume.
            need.set(s[left], need.get(s[left]) + 1);
            missing++;
            left++;
        }
    }
    return bestLen === Infinity ? "" : s.slice(bestStart, bestStart + bestLen);
};
