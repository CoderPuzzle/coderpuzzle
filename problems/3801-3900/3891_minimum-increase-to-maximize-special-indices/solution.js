/**
 * @param {number[]} nums
 * @return {number}
 */
var minIncrease = function (nums) {
    // Special indices are strict peaks that can only be raised, so two of them
    // can never be adjacent: the achievable maximum is a largest independent
    // set of the interior positions, and the cheapest such set is the answer.
    // Raising i above both original neighbours costs
    // max(0, max(nums[i-1], nums[i+1]) + 1 - nums[i]) — a peak's neighbours are
    // never peaks themselves, so they keep their original values. Each cost is
    // at most 10^9 and there are at most n/2 picks, so the total stays far
    // below 2^53 and every intermediate is an exact JS double.
    const n = nums.length;
    const INF = Number.MAX_SAFE_INTEGER;
    // Best (count, cost) pair up to the current position, keyed by whether
    // that position is picked; the comparison is (max count, min cost).
    let notCount = 0,
        notCost = 0;
    let pickCount = -1,
        pickCost = INF;
    for (let i = 1; i < n - 1; i++) {
        const cost = Math.max(0, Math.max(nums[i - 1], nums[i + 1]) + 1 - nums[i]);
        // Picking i requires the previous position to be unpicked.
        const curPickCount = notCount + 1;
        const curPickCost = notCost + cost;
        // Skipping i keeps whichever previous state is better.
        let curNotCount, curNotCost;
        if (pickCount > notCount || (pickCount === notCount && pickCost < notCost)) {
            curNotCount = pickCount;
            curNotCost = pickCost;
        } else {
            curNotCount = notCount;
            curNotCost = notCost;
        }
        notCount = curNotCount;
        notCost = curNotCost;
        pickCount = curPickCount;
        pickCost = curPickCost;
    }
    if (pickCount > notCount || (pickCount === notCount && pickCost < notCost)) {
        return pickCost;
    }
    return notCost;
};
