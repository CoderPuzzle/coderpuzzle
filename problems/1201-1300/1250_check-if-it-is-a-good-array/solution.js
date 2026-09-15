/**
 * @param {number[]} nums
 * @return {boolean}
 */
var isGoodArray = function (nums) {
    // Bézout: the reachable sums are exactly the multiples of the gcd, so a
    // sum of 1 exists iff the overall gcd is 1.
    let overall = 0;
    for (const value of nums) {
        overall = gcd(overall, value);
        if (overall === 1) return true;
    }
    return overall === 1;
};

function gcd(a, b) {
    while (b !== 0) {
        const t = a % b;
        a = b;
        b = t;
    }
    return a;
}
