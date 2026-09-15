/**
 * @param {number} n
 * @return {number}
 */
var countArrangement = function (n) {
    // candidates[p]: the values position p admits — the divisors of p
    // and the multiples of p up to n, the only values that can satisfy
    // either divisibility condition at that position.
    const candidates = Array.from({ length: n + 1 }, () => []);
    for (let p = 1; p <= n; ++p) {
        for (let v = 1; v <= n; ++v) {
            if (v % p === 0 || p % v === 0) candidates[p].push(v);
        }
    }
    const used = new Array(n + 1).fill(false);

    // Every position holds a value: one complete beautiful arrangement.
    const fill = (pos) => {
        if (pos > n) return 1;
        let total = 0;
        for (const v of candidates[pos]) {
            if (!used[v]) {
                used[v] = true;
                total += fill(pos + 1);
                used[v] = false;
            }
        }
        return total;
    };

    return fill(1);
};
