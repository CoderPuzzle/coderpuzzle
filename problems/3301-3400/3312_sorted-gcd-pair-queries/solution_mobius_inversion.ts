function gcdValues(nums: number[], queries: number[]): number[] {
    let maxValue = 0;
    for (const value of nums) {
        if (value > maxValue) maxValue = value;
    }
    const freq: number[] = new Array(maxValue + 1).fill(0);
    for (const value of nums) {
        freq[value]++;
    }
    // Mobius function over [1, maxValue] from a linear sieve: mu[1] = 1,
    // mu[n] = 0 once a squared prime divides n, else (-1)^omega(n).
    const mu: number[] = new Array(maxValue + 1).fill(0);
    mu[1] = 1;
    const sieved: boolean[] = new Array(maxValue + 1).fill(false);
    const primes: number[] = [];
    for (let i = 2; i <= maxValue; i++) {
        if (!sieved[i]) {
            primes.push(i);
            mu[i] = -1;
        }
        for (const prime of primes) {
            if (prime > Math.floor(maxValue / i)) {
                break;
            }
            const multiple = i * prime;
            sieved[multiple] = true;
            if (i % prime === 0) {
                mu[multiple] = 0;
                break;
            }
            mu[multiple] = -mu[i];
        }
    }
    // count[d]: elements divisible by d, the divisor sum of the value
    // frequencies; pairs[d] = count[d] choose 2 counts every pair whose
    // gcd is a multiple of d. Mobius inversion weighs those sums with mu
    // so the proper multiples cancel: exact[d] = sum of mu[k] * pairs[d*k].
    const count: number[] = new Array(maxValue + 1).fill(0);
    for (let d = 1; d <= maxValue; d++) {
        let total = 0;
        for (let multiple = d; multiple <= maxValue; multiple += d) {
            total += freq[multiple];
        }
        count[d] = total;
    }
    const pairs: number[] = new Array(maxValue + 1).fill(0);
    for (let d = 1; d <= maxValue; d++) {
        pairs[d] = (count[d] * (count[d] - 1)) / 2;
    }
    const exact: number[] = new Array(maxValue + 1).fill(0);
    for (let d = 1; d <= maxValue; d++) {
        let total = 0;
        let multiple = d;
        for (let k = 1; multiple <= maxValue; k++) {
            total += mu[k] * pairs[multiple];
            multiple += d;
        }
        exact[d] = total;
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
