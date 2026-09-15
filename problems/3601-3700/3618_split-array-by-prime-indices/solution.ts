function splitArray(nums: number[]): number {
    // Sieve of Eratosthenes marks which indices are prime in
    // O(n log log n); a single pass then routes each element to A or B.
    const n = nums.length;
    const isPrime = new Array<boolean>(n).fill(true);
    if (n > 0) isPrime[0] = false;
    if (n > 1) isPrime[1] = false;
    for (let p = 2; p * p < n; ++p) {
        if (!isPrime[p]) continue;
        for (let multiple = p * p; multiple < n; multiple += p) {
            isPrime[multiple] = false;
        }
    }

    let sumA = 0;
    let sumB = 0;
    for (let index = 0; index < n; ++index) {
        if (isPrime[index]) sumA += nums[index];
        else sumB += nums[index];
    }
    // |sum(A) - sum(B)| is at most n * 1e9 <= 1e14 < 2^53, so Number is exact.
    return Math.abs(sumA - sumB);
}
