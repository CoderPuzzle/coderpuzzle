/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var primeSubarray = function (nums, k) {
    // Sieve, then slide a window whose spread is taken over prime values
    // alone: two monotonic deques of prime positions expose the window's
    // min/max prime, and lo is the minimal left end whose prime spread is
    // <= k. Widening leftward only adds primes, so the starts that keep
    // the spread <= k form a suffix; starts that keep at least two primes
    // inside form a prefix ending at prev2, the second-to-last prime
    // position at or before the right end. The two ranges intersect in
    // [lo, prev2], and each start there yields one balanced subarray
    // ending here — add its length per right end.
    const limit = Math.max(...nums);
    const isPrime = new Array(limit + 1).fill(false);
    for (let value = 2; value <= limit; value++) isPrime[value] = true;
    for (let value = 2; value * value <= limit; value++) {
        if (isPrime[value]) {
            for (let multiple = value * value; multiple <= limit; multiple += value) {
                isPrime[multiple] = false;
            }
        }
    }
    let total = 0;
    let lo = 0;
    let prev1 = -1; // last prime position at or before i
    let prev2 = -1; // second-to-last prime position at or before i
    const mins = []; // prime positions, prime values increasing toward the back
    const maxs = []; // prime positions, prime values decreasing toward the back
    for (let i = 0; i < nums.length; i++) {
        if (isPrime[nums[i]]) {
            while (mins.length && nums[mins[mins.length - 1]] >= nums[i]) mins.pop();
            mins.push(i);
            while (maxs.length && nums[maxs[maxs.length - 1]] <= nums[i]) maxs.pop();
            maxs.push(i);
            prev2 = prev1;
            prev1 = i;
        }
        if (prev2 >= 0) {
            while (nums[maxs[0]] - nums[mins[0]] > k) {
                if (mins[0] === lo) mins.shift();
                if (maxs[0] === lo) maxs.shift();
                lo++;
            }
            if (prev2 >= lo) total += prev2 - lo + 1;
        }
    }
    return total;
};
