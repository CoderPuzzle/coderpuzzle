class Solution {
  public:
    vector<int> transformArray(vector<int> &nums) {
        // After the parity replacement every entry is 0 or 1, so the sorted
        // result is just zeros for the evens followed by ones for the odds.
        int ones = 0;
        for (int x : nums) {
            ones += x & 1;
        }
        vector<int> result(nums.size() - ones, 0);
        result.resize(nums.size(), 1);
        return result;
    }
};
