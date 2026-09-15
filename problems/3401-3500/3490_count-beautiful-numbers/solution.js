/**
 * @param {number} l
 * @param {number} r
 * @return {number}
 */
var beautifulNumbers = function (l, r) {
    const countUpTo = (x) => {
        if (x <= 0) return 0;
        const s = String(x);
        const digits = new Array(s.length);
        for (let i = 0; i < s.length; i++) digits[i] = s.charCodeAt(i) - 48;
        const memo = new Map();
        // Memo scoped per bound: tight transitions depend on x's digits.
        // State: position, tight (prefix equals x's), started (nonzero seen),
        // running digit sum and digit product — all that beauty depends on.
        const dp = (pos, tight, started, ssum, prod) => {
            if (pos === digits.length) {
                // Beautiful iff a number was built and prod is a multiple of
                // the sum; a 0 digit zeroes prod, and 0 is divisible by any
                // positive sum.
                return started && ssum > 0 && prod % ssum === 0 ? 1 : 0;
            }
            const key = (((pos * 2 + (tight ? 1 : 0)) * 2 + (started ? 1 : 0)) * 128 + ssum) * 4294967296 + prod;
            if (memo.has(key)) return memo.get(key);
            // A tight prefix is capped at x's digit; free prefixes take any digit.
            const limit = tight ? digits[pos] : 9;
            let res = 0;
            for (let d = 0; d <= limit; d++) {
                const nt = tight && d === limit;
                // Leading zeros contaminate neither the sum nor the product.
                if (!started && d === 0) {
                    res += dp(pos + 1, nt, false, 0, 1);
                } else {
                    res += dp(pos + 1, nt, true, ssum + d, prod * d);
                }
            }
            memo.set(key, res);
            return res;
        };
        return dp(0, true, false, 0, 1);
    };
    // Beautiful in [l, r] = count up to r minus count up to l - 1.
    return countUpTo(r) - countUpTo(l - 1);
};
