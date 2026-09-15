/**
 * @param {number[]} sweetness
 * @param {number} k
 * @return {number}
 */
var maximizeSweetness = function (sweetness, k) {
    const piecesAtLeast = (target) => {
        // Greedy check: cut as soon as the running sum reaches the target.
        // Cutting earlier never hurts — a delay only feeds an already-satisfied
        // piece and leaves less material for the remaining ones.
        let count = 0;
        let current = 0;
        for (const value of sweetness) {
            current += value;
            if (current >= target) {
                count += 1;
                current = 0;
            }
        }
        return count;
    };

    let total = 0;
    for (const value of sweetness) total += value;

    // Binary search on the answer t: "can we get k+1 pieces each of
    // sweetness >= t?" is monotone in t. The average piece caps the range
    // above; every chunk is positive so t = 1 is always feasible.
    let lo = 1;
    let hi = Math.floor(total / (k + 1));
    let best = 0;
    while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (piecesAtLeast(mid) >= k + 1) {
            // At least k+1 pieces: merging surplus neighbours only raises
            // their sums, so t is feasible — record it and aim higher.
            best = mid;
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }
    return best;
};
