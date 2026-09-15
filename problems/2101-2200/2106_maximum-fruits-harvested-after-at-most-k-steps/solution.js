/**
 * @param {number[][]} fruits
 * @param {number} startPos
 * @param {number} k
 * @return {number}
 */
var maxTotalFruits = function (fruits, startPos, k) {
    const n = fruits.length;
    // An optimal walk turns at most once, so the harvest is always one
    // contiguous interval of the position-sorted fruit array. Prefix sums
    // give each interval's fruit total in O(1).
    const positions = fruits.map((f) => f[0]);
    const prefix = [0];
    for (const f of fruits) {
        prefix.push(prefix[prefix.length - 1] + f[1]);
    }

    const windowCost = (leftPos, rightPos) => {
        // Cheapest cost of covering the interval from startPos: straight
        // line when the start lies outside it; otherwise double the leg
        // walked first, taking the better direction to double.
        if (startPos <= leftPos) {
            return rightPos - startPos;
        }
        if (startPos >= rightPos) {
            return startPos - leftPos;
        }
        return Math.min(
            2 * (startPos - leftPos) + (rightPos - startPos),
            2 * (rightPos - startPos) + (startPos - leftPos),
        );
    };

    let best = 0;
    let left = 0;
    // Two-pointer sweep: shrink while the interval exceeds k, and re-check
    // affordability before counting (a lone unreachable fruit never
    // contributes). Both pointers only advance, so the sweep is linear.
    for (let right = 0; right < n; right++) {
        while (left < right && windowCost(positions[left], positions[right]) > k) {
            left++;
        }
        if (windowCost(positions[left], positions[right]) <= k) {
            best = Math.max(best, prefix[right + 1] - prefix[left]);
        }
    }
    return best;
};
