class Solution {
  public:
    int minOperations(vector<int> &nums) {
        // The answer is at most nums.size() / 2, safely inside int.
        unordered_map<int, int> counts;
        for (int num : nums) {
            ++counts[num];
        }
        int operations = 0;
        for (const auto &entry : counts) {
            if (entry.second == 1) {
                return -1;
            }
            operations += (entry.second + 2) / 3;
        }
        return operations;
    }
};
