#include <algorithm>
#include <vector>

class Solution {
  public:
    bool primeSubOperation(vector<int> &nums) {
        // Sieve once up to max(nums): every usable prime sits below nums[i].
        // Greedy left to right, keeping prev = smallest feasible prefix end —
        // a smaller prefix end never constrains later elements more, so
        // committing greedily stays optimal.
        int limit = *max_element(nums.begin(), nums.end());
        vector<bool> composite(limit + 1, false);
        vector<int> primes;
        for (int i = 2; i <= limit; ++i) {
            if (!composite[i]) {
                primes.push_back(i);
                for (int j = i * i; j <= limit; j += i)
                    composite[j] = true;
            }
        }
        int prev = 0;
        for (int x : nums) {
            // Want the largest prime p with p < x and x - p > prev, which is
            // the largest p <= x - prev - 1 (always < x). Subtracting it then
            // beats leaving x untouched, since the result is smaller yet still
            // above prev.
            int index = upper_bound(primes.begin(), primes.end(), x - prev - 1) - primes.begin() - 1;
            if (index >= 0) {
                prev = x - primes[index];
            } else if (x > prev) {
                prev = x;
            } else {
                return false;
            }
        }
        return true;
    }
};
