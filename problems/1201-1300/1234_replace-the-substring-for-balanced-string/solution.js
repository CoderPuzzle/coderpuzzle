/**
 * @param {string} s
 * @return {number}
 */
var balancedString = function (s) {
    const n = s.length;
    const target = n / 4;
    // Surplus letters are the only ones the window must cover.
    const total = new Map();
    for (const ch of s) total.set(ch, (total.get(ch) ?? 0) + 1);
    const need = new Map();
    for (const [ch, count] of total) if (count > target) need.set(ch, count - target);
    if (need.size === 0) return 0;
    const window = new Map();
    let served = 0;
    let best = n;
    let left = 0;
    for (let right = 0; right < n; ++right) {
        const ch = s[right];
        if (need.has(ch)) {
            const c = (window.get(ch) ?? 0) + 1;
            window.set(ch, c);
            if (c === need.get(ch)) ++served;
        }
        while (served === need.size) {
            best = Math.min(best, right - left + 1);
            const leftCh = s[left];
            if (need.has(leftCh)) {
                const c = window.get(leftCh);
                if (c === need.get(leftCh)) --served;
                window.set(leftCh, c - 1);
            }
            ++left;
        }
    }
    return best;
};
