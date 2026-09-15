class Solution {
  public:
    int primeSubarray(vector<int> &nums, int k) {
        // Sieve, then slide a window whose spread is taken over prime
        // values alone: two monotonic deques of prime positions expose the
        // window's min/max prime, and lo is the minimal left end whose
        // prime spread is <= k. Widening leftward only adds primes, so the
        // starts that keep the spread <= k form a suffix; starts that keep
        // at least two primes inside form a prefix ending at prev2, the
        // second-to-last prime position at or before the right end. The
        // two ranges intersect in [lo, prev2], and each start there yields
        // one balanced subarray ending here — add its length per right end.
        int limit = 0;
        for (int value : nums)
            limit = max(limit, value);
        vector<bool> isPrime(limit + 1, false);
        for (int value = 2; value <= limit; ++value)
            isPrime[value] = true;
        for (int value = 2; (long long)value * value <= limit; ++value) {
            if (isPrime[value]) {
                for (int multiple = value * value; multiple <= limit; multiple += value)
                    isPrime[multiple] = false;
            }
        }
        long long total = 0;
        int lo = 0;
        int prev1 = -1;  // last prime position at or before i
        int prev2 = -1;  // second-to-last prime position at or before i
        deque<int> mins; // prime positions, values increasing
        deque<int> maxs; // prime positions, values decreasing
        for (int i = 0; i < (int)nums.size(); ++i) {
            if (isPrime[nums[i]]) {
                while (!mins.empty() && nums[mins.back()] >= nums[i])
                    mins.pop_back();
                mins.push_back(i);
                while (!maxs.empty() && nums[maxs.back()] <= nums[i])
                    maxs.pop_back();
                maxs.push_back(i);
                prev2 = prev1;
                prev1 = i;
            }
            if (prev2 >= 0) {
                while (nums[maxs.front()] - nums[mins.front()] > k) {
                    if (mins.front() == lo)
                        mins.pop_front();
                    if (maxs.front() == lo)
                        maxs.pop_front();
                    ++lo;
                }
                if (prev2 >= lo)
                    total += prev2 - lo + 1;
            }
        }
        return (int)total;
    }
};
