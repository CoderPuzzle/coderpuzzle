/**
 * @param {number[]} flowers
 * @return {number}
 */
var maximumBeauty = function (flowers) {
    // A valid garden keeps two equally beautiful endpoints i < j and, since
    // removal is free, every positive strictly between them: its sum is
    // 2v + P[j] - P[i+1] with P[k] the sum of max(flowers[t], 0) below k.
    // seen[v] tracks the smallest P[i+1] over past occurrences of v (P only
    // grows, so that is the first one). Totals stay far below 2^53, so
    // plain JS numbers are exact.
    const seen = new Map();
    let pos = 0;
    let answer = -Infinity;
    for (const v of flowers) {
        const best = seen.get(v);
        if (best !== undefined) {
            answer = Math.max(answer, 2 * v + pos - best);
        }
        if (v > 0) {
            pos += v;
        }
        if (best === undefined || pos < best) {
            seen.set(v, pos);
        }
    }
    return answer;
};
