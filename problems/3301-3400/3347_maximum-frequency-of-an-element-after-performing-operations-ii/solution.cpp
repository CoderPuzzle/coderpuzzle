class Solution {
  public:
    int maxFrequency(vector<int> &nums, int k, int numOperations) {
        // A target v collects every element in [v-k, v+k]: elements already
        // equal to v cost nothing, any other costs one operation, and
        // surplus operations can always be spent as +0 elsewhere because
        // numOperations <= n. So the best frequency at v is
        // min(window(v), count(v) + numOperations). Values reach 1e9, far
        // too wide to sweep, so only breakpoints are tried: if the optimum
        // falls off an element, its window's smallest element x can slide
        // the target to x + k without losing anyone, so v = nums[i] and
        // v = nums[i] + k always contain an optimum; nums[i] - k is the
        // symmetric guard. Window bounds reach 3e9, past 32 bits, so the
        // binary-search limits run in long long.
        sort(nums.begin(), nums.end());
        int best = 0;
        for (int x : nums) {
            for (long long v : {(long long)x - k, (long long)x, (long long)x + k}) {
                long long window =
                    upper_bound(nums.begin(), nums.end(), v + k) - lower_bound(nums.begin(), nums.end(), v - k);
                long long exact = upper_bound(nums.begin(), nums.end(), v) - lower_bound(nums.begin(), nums.end(), v);
                best = (int)max((long long)best, min(window, exact + numOperations));
            }
        }
        return best;
    }
};
