class Solution {
  public:
    vector<int> findIndices(vector<int> &nums, int indexDifference, int valueDifference) {
        // The first ordered pair (i, j) clearing both thresholds is a valid
        // answer by the statement's "return any of them"; the conditions are
        // symmetric in the two indices, so scan order only picks the witness.
        for (int i = 0; i < (int)nums.size(); ++i) {
            for (int j = 0; j < (int)nums.size(); ++j) {
                if (abs(i - j) >= indexDifference && abs(nums[i] - nums[j]) >= valueDifference) {
                    return {i, j};
                }
            }
        }
        // Every ordered pair failed both checks, so no answer exists.
        return {-1, -1};
    }
};
