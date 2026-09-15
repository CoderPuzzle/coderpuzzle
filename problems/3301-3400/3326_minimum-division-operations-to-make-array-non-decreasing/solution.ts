// A division replaces a composite x by its smallest prime factor (x's
// greatest proper divisor), and primes are stuck: their greatest proper
// divisor is 1, so dividing leaves them unchanged. Every element therefore
// ends as itself, or — for one operation — as its smallest prime factor.
// Scan from the right keeping the value the previous (righter) slot
// settled on: keep x when it fits (no operation, and the loosest bound for
// the left neighbor), otherwise divide once when the smallest prime factor
// fits, else the array is impossible. Smallest prime factors up to
// max(nums) come from one sieve pass.
function minOperations(nums: number[]): number {
    let limit = 0;
    for (const x of nums) {
        limit = Math.max(limit, x);
    }
    const spf = new Int32Array(limit + 1);
    for (let i = 2; i <= limit; i += 1) {
        if (spf[i] === 0) {
            for (let j = i; j <= limit; j += i) {
                if (spf[j] === 0) {
                    spf[j] = i;
                }
            }
        }
    }
    let ops = 0;
    let bound = limit + 1;
    for (let i = nums.length - 1; i >= 0; i -= 1) {
        const x = nums[i];
        if (x <= bound) {
            bound = x;
        } else if (x > 1 && spf[x] <= bound) {
            ops += 1;
            bound = spf[x];
        } else {
            return -1;
        }
    }
    return ops;
}
