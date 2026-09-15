/**
 * @param {number} n
 * @return {number}
 */
var sumOfBlocks = function (n) {
    // Build the blocks in order from one shared counter: block i
    // multiplies the next i consecutive integers into a product that is
    // reduced modulo 10^9 + 7 after every factor, then folds it into the
    // running total. F(n) combines the blocks using only multiplication
    // and addition, so residue arithmetic reproduces F(n) mod 10^9 + 7
    // exactly while the exact products are never materialized.
    const MOD = 1_000_000_007;
    let total = 0;
    let cur = 1;
    for (let i = 1; i <= n; i++) {
        let prod = 1;
        for (let j = 0; j < i; j++) {
            prod = (prod * cur) % MOD;
            cur++;
        }
        total = (total + prod) % MOD;
    }
    // Every reduced value stays below 10^9 + 7 and cur tops out at
    // 500500 = 1000 * 1001 / 2, so the widest intermediate, prod * cur,
    // stays below about 5.1e14 — well under 2^53, keeping plain Numbers
    // exact without BigInt.
    return total;
};
