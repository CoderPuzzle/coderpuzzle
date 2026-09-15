class Solution {
  public:
    vector<int> pivotArray(vector<int> &nums, int pivot) {
        // Stable three-way partition: gather each comparison class in its
        // original order and concatenate, which preserves the relative order
        // inside the less and greater groups by construction.
        vector<int> less, equal, greater;
        for (int value : nums) {
            if (value < pivot) {
                less.push_back(value);
            } else if (value > pivot) {
                greater.push_back(value);
            } else {
                equal.push_back(value);
            }
        }
        vector<int> result;
        result.reserve(nums.size());
        result.insert(result.end(), less.begin(), less.end());
        result.insert(result.end(), equal.begin(), equal.end());
        result.insert(result.end(), greater.begin(), greater.end());
        return result;
    }
};
