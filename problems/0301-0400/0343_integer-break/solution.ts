function integerBreak(n: number): number {
    // best[i]: the maximum product over all sums of two or more positive
    // integers totalling i. Build each i by choosing a first part j; the
    // remainder either stands whole as one part (the identity i - j, a
    // two-part sum) or breaks further (best[i - j], already two or more).
    const best: number[] = new Array(n + 1).fill(0);
    best[1] = 1;
    for (let i = 2; i <= n; ++i) {
        for (let j = 1; j < i; ++j) {
            // The inner max is the k >= 2 rule: i itself is never a legal
            // one-part product, only genuine splits enter the table.
            best[i] = Math.max(best[i], j * Math.max(best[i - j], i - j));
        }
    }
    return best[n];
}
