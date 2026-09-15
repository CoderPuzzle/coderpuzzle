/**
 * @param {number[][]} transactions
 * @return {number}
 */
var minTransfers = function (transactions) {
    const balance = new Map();
    for (const [frm, to, amount] of transactions) {
        balance.set(frm, (balance.get(frm) || 0) - amount);
        balance.set(to, (balance.get(to) || 0) + amount);
    }
    const debts = [];
    balance.forEach(function (v) {
        if (v !== 0) debts.push(v);
    });
    // Only nonzero net balances matter: any zero-sum group of s people
    // settles in s-1 transfers, so maximizing the group count g of a
    // partition minimizes the total n - g.
    const n = debts.length;
    if (n === 0) return 0;

    const total = 1 << n;
    // Subset sums built incrementally via the lowest set bit; valid marks
    // zero-sum subsets, the candidate groups.
    const sums = new Array(total).fill(0);
    const valid = new Array(total).fill(false);
    for (let mask = 1; mask < total; mask++) {
        const lsb = mask & -mask;
        const bit = Math.log2(lsb);
        sums[mask] = sums[mask ^ lsb] + debts[bit];
        valid[mask] = sums[mask] === 0;
    }

    // dp[mask] = most disjoint valid groups partitioning mask; NEG means
    // "not exactly partitionable", so only full covers add.
    const NEG = -1e9;
    const dp = new Array(total).fill(NEG);
    dp[0] = 0;
    for (let mask = 1; mask < total; mask++) {
        let sub = mask;
        while (sub) {
            if (valid[sub] && dp[mask ^ sub] !== NEG) {
                dp[mask] = Math.max(dp[mask], dp[mask ^ sub] + 1);
            }
            sub = (sub - 1) & mask;
        }
    }
    // Fewest transactions = n balances minus the best group count.
    return n - dp[total - 1];
};
