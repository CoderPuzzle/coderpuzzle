class Solution {
  public:
    bool findSubarrays(vector<int> &nums) {
        // Sweep the n-1 length-2 window sums into a set; the first
        // repeat answers true.
        unordered_set<int> seen;
        for (int i = 0; i + 1 < (int)nums.size(); ++i) {
            int pair_sum = nums[i] + nums[i + 1];
            if (!seen.insert(pair_sum).second) {
                return true;
            }
        }
        return false;
    }
};
