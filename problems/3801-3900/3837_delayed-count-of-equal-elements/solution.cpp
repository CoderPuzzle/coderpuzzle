class Solution {
  public:
    vector<int> delayedCount(vector<int> &nums, int k) {
        // Sweep i from the right; freq counts occurrences of each value in
        // the window [i + k + 1, n - 1], so stepping i down inserts exactly
        // nums[i + k + 1] and the delayed count is a single lookup.
        int n = nums.size();
        vector<int> ans(n, 0);
        unordered_map<int, int> freq;
        for (int i = n - 1; i >= 0; i--) {
            int ahead = i + k + 1;
            if (ahead < n) {
                freq[nums[ahead]]++;
            }
            auto found = freq.find(nums[i]);
            ans[i] = found == freq.end() ? 0 : found->second;
        }
        return ans;
    }
};
