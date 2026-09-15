/**
 * @param {number[][]} ranges
 * @return {number}
 */
var countWays = function (ranges) {
    // Sort by start point; overlapping ranges then form contiguous
    // runs, and each maximal run sits in either group freely, so the
    // answer is 2^(runs) mod 1e9+7 by iterative binary exponentiation.
    // JS numbers stay exact because the peasant mul-mod below never
    // lets any value reach 2^31, far under 2^53.
    const mod = 1000000007;
    const addMod = (a, b) => {
        const sum = a + b;
        return sum >= mod ? sum - mod : sum;
    };
    const mulMod = (a, b) => {
        let result = 0;
        while (b > 0) {
            if ((b & 1) === 1) result = addMod(result, a);
            a = addMod(a, a);
            b >>>= 1;
        }
        return result;
    };
    const sorted = [...ranges].sort((x, y) => x[0] - y[0]);
    let groups = 1;
    let reach = sorted[0][1];
    for (let i = 1; i < sorted.length; ++i) {
        const [s, e] = sorted[i];
        if (s > reach) {
            ++groups;
            reach = e;
        } else if (e > reach) {
            reach = e;
        }
    }
    let result = 1;
    let base = 2 % mod;
    for (let e = groups; e > 0; e >>>= 1) {
        if ((e & 1) === 1) result = mulMod(result, base);
        base = mulMod(base, base);
    }
    return result;
};
