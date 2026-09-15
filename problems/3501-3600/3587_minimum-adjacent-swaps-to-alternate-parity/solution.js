/**
 * @param {number[]} nums
 * @return {number}
 */
var minSwaps = function (nums) {
    // Only parity matters. In any target alternating pattern the k-th
    // even (in current order) must land on the k-th even slot —
    // crossings among equal-parity elements never pay — and each
    // adjacent swap moves exactly one even by one position, so a
    // pattern's cost is the sum |even index - even slot| (the odds
    // mirror the evens). Try both patterns; a pattern is feasible only
    // when its even-slot count equals the even count, which also
    // encodes the |evenCnt - oddCnt| > 1 impossibility. Costs are
    // bounded by n^2/8 + n <= 1.3e9 < 2^53, so Number math is exact.
    const evens = [];
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] % 2 === 0) evens.push(i);
    }
    const k = evens.length;
    const n = nums.length;
    let best = -1;
    for (const start of [0, 1]) {
        if ((n - start + 1) >> 1 !== k) continue;
        let cost = 0;
        for (let j = 0; j < k; j++) {
            cost += Math.abs(evens[j] - (start + 2 * j));
        }
        if (best < 0 || cost < best) best = cost;
    }
    return best;
};
