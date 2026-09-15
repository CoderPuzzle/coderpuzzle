/**
 * @param {number} n
 * @return {number}
 */
var minimumBoxes = function (n) {
    // Densest packing lives in a corner. A complete k-step staircase
    // floor of T(k) = k(k+1)/2 cells carries the pyramid of
    // S(k) = k(k+1)(k+2)/6 boxes, and j extra cells laid along the
    // next diagonal add T(j) = j(j+1)/2 more. Binary-search the
    // largest pyramid strictly below n, then the fewest runoff cells
    // covering the rest; the answer is T(k) + j.
    let lo = 0;
    let hi = 2500; // S(2500) > 2^31 - 1, so hi stands above every n
    while (hi - lo > 1) {
        const mid = Math.floor((lo + hi) / 2);
        if ((mid * (mid + 1) * (mid + 2)) / 6 < n) {
            lo = mid;
        } else {
            hi = mid;
        }
    }
    const k = lo; // largest k with S(k) < n
    const rest = n - (k * (k + 1) * (k + 2)) / 6;
    let jlo = 1;
    let jhi = k + 1; // T(k+1) >= rest always holds
    while (jlo < jhi) {
        const mid = Math.floor((jlo + jhi) / 2);
        if ((mid * (mid + 1)) / 2 >= rest) {
            jhi = mid;
        } else {
            jlo = mid + 1;
        }
    }
    return (k * (k + 1)) / 2 + jlo;
};
