function maximumWealth(accounts: number[][]): number {
    // Wealth is a per-row quantity: each customer's wealth is the sum of
    // their row, and the answer is the largest of those sums. Every
    // balance is at least 1, so a running maximum seeded at 0 is always
    // overwritten by the first row.
    let richest = 0;
    for (const row of accounts) {
        let wealth = 0;
        for (const balance of row) {
            wealth += balance;
        }
        richest = Math.max(richest, wealth);
    }
    return richest;
}
