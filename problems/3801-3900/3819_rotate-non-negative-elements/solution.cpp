class Solution {
  public:
    vector<int> rotateElements(vector<int> &nums, int k) {
        // Gather the non-negative values in scan order, compute the effective
        // left shift k % m once, then scatter values[(j + shift) % m] into the
        // j-th originally non-negative slot — negatives are never touched.
        vector<int> values;
        for (int value : nums) {
            if (value >= 0) {
                values.push_back(value);
            }
        }
        int m = values.size();
        int n = nums.size();
        vector<int> result(nums);
        if (m == 0) {
            return result;
        }
        int shift = k % m;
        int at = 0;
        for (int index = 0; index < n; index++) {
            if (nums[index] >= 0) {
                result[index] = values[(at + shift) % m];
                at++;
            }
        }
        return result;
    }
};
