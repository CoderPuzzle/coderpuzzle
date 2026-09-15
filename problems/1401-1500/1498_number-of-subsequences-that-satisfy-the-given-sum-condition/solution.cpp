class Solution {
  public:
    int numSubseq(vector<int> &nums, int target) {
        const int MOD = 1'000'000'007;
        // A subsequence is defined by membership, not order, so sorting loses
        // nothing; validity then depends only on smallest + largest <= target.
        sort(nums.begin(), nums.end());
        int n = nums.size();
        // Powers of two: elements strictly between the two pointers may be
        // included or excluded freely.
        vector<long long> powers(n);
        powers[0] = 1;
        for (int i = 1; i < n; i++) {
            powers[i] = powers[i - 1] * 2 % MOD;
        }
        long long total = 0;
        int lo = 0, hi = n - 1;
        while (lo <= hi) {
            if (nums[lo] + nums[hi] <= target) {
                // hi is the farthest legal partner of lo (earlier decrements
                // rule out anything beyond), so 2^(hi-lo) subsequences have
                // their minimum exactly at lo.
                total = (total + powers[hi - lo]) % MOD;
                lo++;
            } else {
                // nums[hi] is too large to pair with anything at or after lo.
                hi--;
            }
        }
        return (int)total;
    }
};
