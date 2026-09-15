class Solution {
  public:
    int minOperations(vector<int> &nums) {
        // A division replaces a composite x by its smallest prime factor
        // (x's greatest proper divisor), and primes are stuck: their
        // greatest proper divisor is 1, so dividing leaves them unchanged.
        // Every element therefore ends as itself, or — for one operation —
        // as its smallest prime factor. Scan from the right keeping the
        // value the previous (righter) slot settled on: keep x when it
        // fits (no operation, and the loosest bound for the left
        // neighbor), otherwise divide once when the smallest prime factor
        // fits, else the array is impossible. Smallest prime factors up to
        // max(nums) come from one sieve pass.
        int limit = 0;
        for (int x : nums) {
            limit = max(limit, x);
        }
        vector<int> spf(limit + 1, 0);
        for (int i = 2; i <= limit; ++i) {
            if (spf[i] == 0) {
                for (int j = i; j <= limit; j += i) {
                    if (spf[j] == 0) {
                        spf[j] = i;
                    }
                }
            }
        }
        int ops = 0;
        int bound = limit + 1;
        for (int i = (int)nums.size() - 1; i >= 0; --i) {
            int x = nums[i];
            if (x <= bound) {
                bound = x;
            } else if (x > 1 && spf[x] <= bound) {
                ++ops;
                bound = spf[x];
            } else {
                return -1;
            }
        }
        return ops;
    }
};
