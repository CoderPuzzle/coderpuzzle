/**
 * @param {number[][]} envelopes
 * @return {number}
 */
var maxEnvelopes = function (envelopes) {
    // Width ascending, height descending on ties: a chain needs strictly
    // increasing widths, so at most one envelope per width fits, and the
    // descending tie-break keeps equal widths from chaining among
    // themselves — the task reduces to LIS on heights.
    envelopes = envelopes.slice().sort((a, b) => a[0] - b[0] || b[1] - a[1]);
    // Patience sorting: tails[i] = min height ending a chain of length i+1.
    const tails = [];
    for (const e of envelopes) {
        const x = e[1];
        // Lower-bound search enforces STRICT increase (rejects equal
        // heights); extend the longest chain or replace the first >=
        // tail — safe, it only helps future extensions.
        let lo = 0,
            hi = tails.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (tails[mid] < x) lo = mid + 1;
            else hi = mid;
        }
        if (lo === tails.length) tails.push(x);
        else tails[lo] = x;
    }
    return tails.length;
};
