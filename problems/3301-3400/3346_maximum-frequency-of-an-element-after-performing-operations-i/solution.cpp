class Solution {
  public:
    int maxFrequency(vector<int> &nums, int k, int numOperations) {
        // A target v collects every element in [v-k, v+k]: elements already
        // equal to v cost nothing, any other costs one operation, and
        // surplus operations can always be spent as +0 elsewhere because
        // numOperations <= n. So the best frequency at v is
        // min(window(v), count(v) + numOperations). Elements are >= 1, so
        // targets below 1 never beat v = 1, and targets above max(nums)+k
        // see an empty window; a sliding window over every integer v in
        // [1, max(nums)+k] therefore evaluates all candidates.
        sort(nums.begin(), nums.end());
        unordered_map<int, int> count;
        for (int x : nums) {
            count[x]++;
        }
        int best = 0;
        int lo = 0, hi = 0, n = nums.size();
        for (int v = 1; v <= nums[n - 1] + k; v++) {
            while (hi < n && nums[hi] <= v + k) {
                hi++;
            }
            while (lo < hi && nums[lo] < v - k) {
                lo++;
            }
            auto it = count.find(v);
            int exact = it == count.end() ? 0 : it->second;
            best = max(best, min(hi - lo, exact + numOperations));
        }
        return best;
    }
};
