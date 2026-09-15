/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minKBitFlips = function (nums, k) {
    const n = nums.length;
    const hint = new Array(n).fill(0);
    let flips = 0;
    // flip = parity of all flip windows still covering index i
    let flip = 0;
    for (let i = 0; i < n; i++) {
        // fold in the flips whose windows end just before i
        flip ^= hint[i];
        // effective bit nums[i] ^ flip is 0: only a flip starting at i
        // can fix it, so the greedy choice is forced
        if ((nums[i] ^ flip) === 0) {
            // the forced window would run past the end: impossible
            if (i + k > n) {
                return -1;
            }
            flips += 1;
            flip ^= 1;
            // pre-schedule this flip to stop applying after i + k - 1
            if (i + k < n) {
                hint[i + k] ^= 1;
            }
        }
    }
    return flips;
};
