/**
 * @param {number[]} nums
 * @param {number} modulo
 * @param {number} k
 * @return {number}
 */
var countInterestingSubarrays = function (nums, modulo, k) {
    // Only whether nums[i] % modulo == k matters, so track pref: the number
    // of hits among the prefix. A subarray is interesting iff its hit count
    // has residue k — prefix-sum counting, applied to residues. Seed residue
    // 0 for the empty prefix so subarrays starting at index 0 are counted.
    const count = new Map();
    count.set(0, 1);
    let pref = 0;
    let ans = 0;
    for (const x of nums) {
        if (x % modulo === k) pref++;
        // Right endpoint at i pairs with every earlier boundary l where
        // pref[right] - pref[l] = k (mod modulo); the fixup keeps the
        // residue non-negative for map lookups.
        let need = (pref - k) % modulo;
        if (need < 0) need += modulo;
        ans += count.get(need) || 0;
        const key = pref % modulo;
        count.set(key, (count.get(key) || 0) + 1);
    }
    return ans;
};
