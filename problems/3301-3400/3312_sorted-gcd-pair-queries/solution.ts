function gcdValues(nums: number[], queries: number[]): number[] {
    let maxValue = 0;
    for (const value of nums) {
        if (value > maxValue) maxValue = value;
    }
    const freq: number[] = new Array(maxValue + 1).fill(0);
    for (const value of nums) {
        freq[value]++;
    }
    // pairs_with_gcd[d]: pairs whose gcd is exactly d. Processing d from
    // maxValue down, pairs sharing divisor d minus the already-fixed
    // exact counts of every proper multiple of d (inclusion-exclusion).
    const exact: number[] = new Array(maxValue + 1).fill(0);
    for (let d = maxValue; d >= 1; d--) {
        let count = 0;
        for (let multiple = d; multiple <= maxValue; multiple += d) {
            count += freq[multiple];
        }
        let pairs = (count * (count - 1)) / 2;
        for (let multiple = 2 * d; multiple <= maxValue; multiple += d) {
            pairs -= exact[multiple];
        }
        exact[d] = pairs;
    }
    const prefix: number[] = new Array(maxValue + 1).fill(0);
    let running = 0;
    for (let d = 1; d <= maxValue; d++) {
        running += exact[d];
        prefix[d] = running;
    }
    // Query indices reach n * (n - 1) / 2 - 1 ~= 5 * 10^9, exact in JS
    // numbers (below 2^53); each answer is a gcd, at most 5 * 10^4.
    const answer: number[] = new Array(queries.length);
    for (let i = 0; i < queries.length; i++) {
        let lo = 1;
        let hi = maxValue;
        const target = queries[i] + 1;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (prefix[mid] >= target) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        answer[i] = lo;
    }
    return answer;
}
