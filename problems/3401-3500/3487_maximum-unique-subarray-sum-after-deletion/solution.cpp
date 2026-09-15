class Solution {
  public:
    // Deletions are free, so the chosen subarray is really a set of
    // distinct values: keep every positive value once, and when no
    // positive exists the best set is the single largest element.
    int maxSum(vector<int> &nums) {
        unordered_set<int> seen;
        int total = 0;
        int largest = nums[0];
        for (int v : nums) {
            largest = max(largest, v);
            if (v > 0 && seen.insert(v).second) {
                total += v;
            }
        }
        return seen.empty() ? largest : total;
    }
};
