/**
 * @param {number[]} complexity
 * @return {number}
 */
var countPermutations = function (complexity) {
    // Computer i can only be unlocked through some already-unlocked
    // j < i with lower complexity, so the leftmost minimum of the whole
    // array can never be unlocked unless it is computer 0 itself: no
    // smaller label exists to unlock it through. Hence the answer is
    // (n - 1)! when complexity[0] is the strict minimum, else 0.
    const MOD = 1000000007;
    for (let i = 1; i < complexity.length; i++) if (complexity[i] <= complexity[0]) return 0;
    // count < 2^30 and multiplier <= 1e5 < 2^17, so the product stays
    // below 2^47 and Number arithmetic stays exact.
    let count = 1;
    for (let multiplier = 2; multiplier < complexity.length; multiplier++) count = (count * multiplier) % MOD;
    return count;
};
