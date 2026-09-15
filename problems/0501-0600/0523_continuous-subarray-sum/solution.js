/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var checkSubarraySum = function (nums, k) {
    // Two prefixes with the same remainder mod k sandwich a subarray whose
    // sum is a multiple of k, so one pass keeps the running remainder and
    // the FIRST index it was seen at. The empty prefix already has
    // remainder 0 — seeding it at index -1 certifies windows starting at
    // index 0 and makes a zero-sum pair like [0, 0] good, since 0 is a
    // multiple of every k.
    const firstIndex = new Map([[0, -1]]);
    let remainder = 0;
    for (let index = 0; index < nums.length; ++index) {
        // every intermediate fits a double exactly: values cap at 1e9 and
        // the modded running sum stays below k <= 2^31 - 1.
        remainder = (remainder + nums[index]) % k;
        // A repeat is a good subarray only when it spans two or more
        // elements, and only the earliest occurrence gives the widest
        // span — keep first, never overwrite.
        const earlier = firstIndex.get(remainder);
        if (earlier !== undefined && index - earlier >= 2) return true;
        if (!firstIndex.has(remainder)) firstIndex.set(remainder, index);
    }
    return false;
};
