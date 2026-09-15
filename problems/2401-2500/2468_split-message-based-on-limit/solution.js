/**
 * @param {string} message
 * @param {number} limit
 * @return {string[]}
 */
var splitMessage = function (message, limit) {
    // digitLen[i] = total decimal digit count of integers 1..i, so each
    // candidate part count b costs O(1) instead of O(b).
    const n = message.length;
    const digitLen = new Array(n + 1).fill(0);
    for (let x = 1; x <= n; ++x) {
        digitLen[x] = digitLen[x - 1] + String(x).length;
    }
    for (let b = 1; b <= n; ++b) {
        const digitsB = String(b).length;
        if (2 * digitsB + 3 > limit) break; // widest suffix "<b/b>" won't fit
        // Capacity: sum over a=1..b of (limit - len(str(a)) - digitsB - 3).
        const capacity = b * limit - digitLen[b] - b * digitsB - 3 * b;
        if (capacity < n) continue;
        const parts = [];
        let pos = 0;
        for (let a = 1; a <= b; ++a) {
            const suffix = `<${a}/${b}>`;
            const take = Math.min(limit - suffix.length, n - pos);
            parts.push(message.slice(pos, pos + take) + suffix);
            pos += take;
        }
        return parts;
    }
    return [];
};
