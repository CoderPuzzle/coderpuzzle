function minimumRelativeLosses(prices: number[], queries: number[][]): number[] {
    // All magnitudes stay < 2**53: prefix sums reach at most 10^14 and
    // 2*k*m at most 2*10^14.
    prices.sort((a, b) => a - b);
    const n = prices.length;
    const prefix: number[] = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) prefix[i + 1] = prefix[i] + prices[i];
    const answer: number[] = [];
    for (const [k, m] of queries) {
        let lo = 0;
        let hi = n;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (prices[mid] <= k) lo = mid + 1;
            else hi = mid;
        }
        const split = lo;
        lo = Math.max(0, m - (n - split));
        hi = Math.min(m, split);
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (prices[mid] + prices[n - m + mid] >= 2 * k) hi = mid;
            else lo = mid + 1;
        }
        const rest = m - lo;
        answer.push(prefix[lo] + 2 * k * rest - (prefix[n] - prefix[n - rest]));
    }
    return answer;
}
