function numberOfBeautifulIntegers(low: number, high: number, k: number): number {
    // countUpTo(n) = beautiful integers in [1, n]; the answer is the
    // difference of the two bounds. f(0) returns 0, so low = 1 contributes
    // nothing on the low side.
    function countUpTo(n: number): number {
        if (n <= 0) return 0;
        const digits: number[] = String(n).split("").map(Number);
        const L = digits.length;
        const memo = new Float64Array(11 * 2 * 2 * 21 * k).fill(-1);
        function dp(pos: number, tight: number, started: number, balance: number, mod: number): number {
            // Digit DP tracking everything the two conditions need: balance
            // (odd digits minus even digits written so far) and value mod k.
            // Memoization shares all loose subproblems, so the recursion
            // enumerates states, not numbers.
            if (pos === L) {
                return started === 1 && balance === 0 && mod === 0 ? 1 : 0;
            }
            const key = (((pos * 2 + tight) * 2 + started) * 21 + balance + 10) * k + mod;
            if (memo[key] >= 0) return memo[key];
            // tight: prefix still equals the bound's, capping this digit.
            const limit = tight === 1 ? digits[pos] : 9;
            let total = 0;
            for (let d = 0; d <= limit; d++) {
                const nextTight = tight === 1 && d === limit ? 1 : 0;
                // A leading zero writes nothing: it leaves the balance
                // untouched and does not count as an even digit.
                if (started === 0 && d === 0) {
                    total += dp(pos + 1, nextTight, 0, balance, (mod * 10 + d) % k);
                } else {
                    const newBalance = balance + (d % 2 === 1 ? 1 : -1);
                    total += dp(pos + 1, nextTight, 1, newBalance, (mod * 10 + d) % k);
                }
            }
            memo[key] = total;
            return total;
        }
        return dp(0, 1, 0, 0, 0);
    }
    return countUpTo(high) - countUpTo(low - 1);
}
