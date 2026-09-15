/**
 * @param {number[]} nums
 * @return {number}
 */
var maxXorSubsequences = function (nums) {
    // A subsequence's XOR only depends on which positions it picks, and
    // XOR-ing two achievable values is again achievable, while any
    // achievable z arises as z ^ 0: the answer is the largest XOR any
    // subset can form, the classic linear-basis maximum. Values stay below
    // 2^30, inside the 32-bit range of bitwise operators.
    const basis = new Int32Array(30); // basis[b] leads with bit b
    for (const v of nums) {
        let cur = v;
        while (cur !== 0) {
            const b = 31 - Math.clz32(cur);
            if (basis[b] !== 0) {
                cur ^= basis[b]; // dependent: strip the leading bit
            } else {
                basis[b] = cur; // free leading bit: store and stop
                break;
            }
        }
    }
    // Greedy fold, highest pivot first: take a vector iff it grows the
    // answer. An all-zero input leaves the basis empty at 0.
    let ans = 0;
    for (let b = 29; b >= 0; b--) {
        if (basis[b] !== 0 && (ans ^ basis[b]) > ans) {
            ans ^= basis[b];
        }
    }
    return ans;
};
