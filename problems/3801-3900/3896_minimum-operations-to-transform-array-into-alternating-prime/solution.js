/**
 * @param {number[]} nums
 * @return {number}
 */
var minOperations = function (nums) {
    // Sieve of Eratosthenes up to a fixed bound. Every nums[i] is at
    // most 1e5, and the largest prime gap below 1e5 is far smaller
    // than the margin, so the next prime (or next non-prime) after any
    // element always lies inside the table.
    const limit = 300000;
    const isPrime = new Array(limit + 1).fill(true);
    isPrime[0] = isPrime[1] = false;
    for (let p = 2; p * p <= limit; p++) {
        if (isPrime[p]) {
            for (let multiple = p * p; multiple <= limit; multiple += p) {
                isPrime[multiple] = false;
            }
        }
    }

    let total = 0;
    for (let i = 0; i < nums.length; i++) {
        let x = nums[i];
        if (i % 2 === 0) {
            while (!isPrime[x]) {
                x += 1;
            }
        } else {
            while (isPrime[x]) {
                x += 1;
            }
        }
        total += x - nums[i];
    }
    return total;
};
