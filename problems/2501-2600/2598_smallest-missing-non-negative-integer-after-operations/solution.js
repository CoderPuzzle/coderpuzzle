/**
 * @param {number[]} nums
 * @param {number} value
 * @return {number}
 */
var findSmallestInteger = function (nums, value) {
    // Adding or subtracting value never changes an element's residue
    // mod value, so element x can be retargeted anywhere in its own
    // residue class. Count how many elements land in each residue
    // (normalised with ((x % v) + v) % v, since % keeps the dividend's
    // sign), then consume targets 0, 1, 2, ... in order — target t
    // draws one element from class t % value. The first target whose
    // class is exhausted is the largest achievable MEX.
    const count = new Array(value).fill(0);
    for (const x of nums) {
        count[((x % value) + value) % value]++;
    }
    let mex = 0;
    while (count[mex % value] > 0) {
        count[mex % value]--;
        mex++;
    }
    return mex;
};
