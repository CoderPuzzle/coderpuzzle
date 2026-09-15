class Solution {
  public:
    vector<vector<int>> divideArray(vector<int> &nums, int k) {
        // Sorting is forced: the global minimum may only share a group with
        // the two values closest above it, and inductively every valid
        // division groups consecutive sorted values — so sort and check
        // each consecutive triple's spread (last minus first is the
        // widest).
        sort(nums.begin(), nums.end());
        vector<vector<int>> result;
        for (int i = 0; i + 2 < (int)nums.size(); i += 3) {
            if (nums[i + 2] - nums[i] > k) {
                return {};
            }
            result.push_back({nums[i], nums[i + 1], nums[i + 2]});
        }
        return result;
    }
};
