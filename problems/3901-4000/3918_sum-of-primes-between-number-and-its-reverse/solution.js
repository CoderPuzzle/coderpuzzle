/**
 * @param {number} n
 * @return {number}
 */
var sumOfPrimesInRange = function (n) {
    const limit = 1000;
    const isPrime = new Array(limit + 1).fill(true);
    isPrime[0] = isPrime[1] = false;
    for (let p = 2; p * p <= limit; p++) {
        if (isPrime[p]) {
            for (let multiple = p * p; multiple <= limit; multiple += p) {
                isPrime[multiple] = false;
            }
        }
    }

    const prefix = new Array(limit + 1).fill(0);
    for (let value = 1; value <= limit; value++) {
        prefix[value] = prefix[value - 1] + (isPrime[value] ? value : 0);
    }

    let reverse = 0;
    let remaining = n;
    while (remaining > 0) {
        reverse = reverse * 10 + (remaining % 10);
        remaining = Math.floor(remaining / 10);
    }

    return prefix[Math.max(n, reverse)] - prefix[Math.min(n, reverse) - 1];
};
