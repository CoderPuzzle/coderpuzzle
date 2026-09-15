class Solution {
  public:
    vector<int> intersection(vector<vector<int>> &nums) {
        // Count how many arrays contain each value; a value present in
        // every array (nums[i] holds distinct values) is counted exactly
        // nums.size() times, and the statement asks for those values
        // sorted ascending.
        unordered_map<int, int> counts;
        for (const auto &arr : nums) {
            for (int v : arr) {
                counts[v]++;
            }
        }
        vector<int> result;
        for (auto &[v, c] : counts) {
            if (c == (int)nums.size()) {
                result.push_back(v);
            }
        }
        sort(result.begin(), result.end());
        return result;
    }
};
