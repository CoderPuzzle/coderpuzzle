class Solution {
  public:
    vector<int> resultsArray(vector<int> &nums, int k) {
        int n = static_cast<int>(nums.size());
        vector<int> results(n - k + 1);
        int run = 1;
        for (int i = 0; i < n; i++) {
            run = (i > 0 && nums[i] == nums[i - 1] + 1) ? run + 1 : 1;
            if (i >= k - 1) {
                results[i - k + 1] = run >= k ? nums[i] : -1;
            }
        }
        return results;
    }
};
