/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countGood = function (nums, k) {
    const count = new Map();
    let pairs = 0;
    let ans = 0;
    let left = 0;
    const n = nums.length;
    for (let right = 0; right < n; right++) {
        const x = nums[right];
        // Appending a value already seen c times inside the window forms
        // exactly c new equal pairs; the map plus this running total keep the
        // pair count exact under any window move (hash map because values
        // reach 1e9).
        const c = count.get(x) || 0;
        pairs += c;
        count.set(x, c + 1);
        // Window [left, right] has >= k pairs, so it and every extension of
        // it to the right are good: exactly n - right subarrays share this
        // right endpoint and start at left or later.
        while (pairs >= k) {
            ans += n - right;
            const y = nums[left];
            // The departing value leaves cy - 1 copies behind, exactly how
            // many pairs its removal destroys.
            const cy = count.get(y);
            count.set(y, cy - 1);
            pairs -= cy - 1;
            left++;
        }
    }
    return ans;
};
