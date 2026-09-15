/**
 * @param {number[]} nums
 * @return {boolean}
 */
var primeSubOperation = function (nums) {
    // Sieve once up to max(nums): every usable prime sits below nums[i].
    // Greedy left to right, keeping prev = smallest feasible prefix end —
    // a smaller prefix end never constrains later elements more, so
    // committing greedily stays optimal.
    const limit = Math.max(...nums);
    const composite = new Array(limit + 1).fill(false);
    const primes = [];
    for (let i = 2; i <= limit; ++i) {
        if (!composite[i]) {
            primes.push(i);
            for (let j = i * i; j <= limit; j += i) composite[j] = true;
        }
    }
    let prev = 0;
    for (const x of nums) {
        // Want the largest prime p with p < x and x - p > prev, which is
        // the largest p <= x - prev - 1 (always < x). Subtracting it then
        // beats leaving x untouched, since the result is smaller yet still
        // above prev.
        const bound = x - prev - 1;
        let lo = 0;
        let hi = primes.length - 1;
        let best = -1;
        while (lo <= hi) {
            const mid = (lo + hi) >> 1;
            if (primes[mid] <= bound) {
                best = mid;
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        if (best >= 0) {
            prev = x - primes[best];
        } else if (x > prev) {
            prev = x;
        } else {
            return false;
        }
    }
    return true;
};
