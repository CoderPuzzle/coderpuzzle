/**
 * @param {number} n
 * @return {number[][]}
 */
var findPrimePairs = function (n) {
    // Sieve of Eratosthenes up to n: assume every integer >= 2 is prime,
    // then cross off each prime's multiples. Any composite has a factor
    // <= its square root, so i * i is where the crossing-off starts.
    const isPrime = new Array(n + 1).fill(true);
    isPrime[0] = false;
    isPrime[1] = false;
    for (let i = 2; i * i <= n; ++i) {
        if (isPrime[i]) {
            for (let multiple = i * i; multiple <= n; multiple += i) {
                isPrime[multiple] = false;
            }
        }
    }
    // Scan the smaller endpoint only: x <= floor(n / 2) forces
    // y = n - x >= x, so every pair appears once, and ascending x gives
    // the required order for free. The smallest prime pair sums to
    // 2 + 2 = 4, so any n below that leaves the list empty.
    const half = Math.floor(n / 2);
    const pairs = [];
    for (let x = 2; x <= half; ++x) {
        if (isPrime[x] && isPrime[n - x]) pairs.push([x, n - x]);
    }
    return pairs;
};
