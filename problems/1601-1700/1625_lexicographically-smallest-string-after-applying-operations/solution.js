/**
 * @param {string} s
 * @param {number} a
 * @param {number} b
 * @return {string}
 */
var findLexSmallestString = function (s, a, b) {
    const n = s.length;
    const seen = new Set([s]);
    const queue = [s];
    let best = s;

    while (queue.length > 0) {
        const cur = queue.shift();
        if (cur < best) {
            best = cur;
        }

        const digits = cur.split("");
        for (let i = 1; i < n; i += 2) {
            const value = (Number(digits[i]) + a) % 10;
            digits[i] = String(value);
        }
        const added = digits.join("");
        if (!seen.has(added)) {
            seen.add(added);
            queue.push(added);
        }

        const rotated = cur.slice(n - b) + cur.slice(0, n - b);
        if (!seen.has(rotated)) {
            seen.add(rotated);
            queue.push(rotated);
        }
    }

    return best;
};
