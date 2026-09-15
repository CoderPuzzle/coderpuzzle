/**
 * @param {string} s
 * @return {number}
 */
var maxUniqueSplit = function (s) {
    const n = s.length;
    const used = new Set();
    let best = 0;
    const walk = (start, count) => {
        if (start === n) {
            best = Math.max(best, count);
            return;
        }
        // count so far plus the (n - start) characters still left, each
        // contributing at most one more piece: a bound on what this
        // branch could still reach, cheap to check before it is explored.
        if (count + (n - start) <= best) return;
        for (let end = start + 1; end <= n; ++end) {
            const piece = s.slice(start, end);
            if (used.has(piece)) continue;
            used.add(piece);
            walk(end, count + 1);
            // Undo so the next candidate length starts from the same
            // used-substring state as this one did.
            used.delete(piece);
        }
    };
    walk(0, 0);
    return best;
};
