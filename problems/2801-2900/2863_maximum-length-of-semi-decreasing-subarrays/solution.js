/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubarrayLength = function (nums) {
    // A subarray nums[j..i] qualifies exactly when j < i and
    // nums[j] > nums[i]; only the two endpoints matter.
    const n = nums.length;
    const order = Array.from({ length: n }, (_, i) => i);
    order.sort((a, b) => nums[b] - nums[a]);
    let best = 0;
    // Sentinel n can never beat any real position x <= n - 1.
    let minIndex = n;
    for (let g = 0; g < n;) {
        let h = g;
        while (h < n && nums[order[h]] === nums[order[g]]) {
            h++;
        }
        // Query first: positions of strictly larger values only, so
        // equal-valued endpoints can never pair with each other.
        for (let k = g; k < h; k++) {
            const x = order[k];
            if (minIndex < x && x - minIndex + 1 > best) {
                best = x - minIndex + 1;
            }
        }
        // Then merge this equal-value group into the running minimum.
        for (let k = g; k < h; k++) {
            if (order[k] < minIndex) {
                minIndex = order[k];
            }
        }
        g = h;
    }
    return best;
};
