/**
 * @param {number[]} citations
 * @return {number}
 */
var hIndex = function (citations) {
    const n = citations.length;
    // h can never exceed the paper count, so citations above n are as good
    // as n: tally into n+1 buckets with oversized values clamped to n.
    const count = new Array(n + 1).fill(0);
    for (const c of citations) {
        count[Math.min(c, n)] += 1;
    }
    // Walk h from the top; after adding bucket h, total is the number of
    // papers with at least h citations (larger counts were clamped into
    // higher-or-equal buckets and are already included).
    let total = 0;
    for (let h = n; h >= 0; h--) {
        total += count[h];
        // First h with "at least h papers cited >= h" is maximal: every
        // larger h was tested first and failed this same test.
        if (total >= h) {
            return h;
        }
    }
    // Unreachable: at h = 0 the accumulated total is n >= 0.
    return 0;
};
