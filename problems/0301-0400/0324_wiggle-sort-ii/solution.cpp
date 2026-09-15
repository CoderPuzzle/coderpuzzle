class Solution {
  public:
    vector<int> wiggleSort(vector<int> &nums) {
        // Sort a copy, then fill the even slots from the back of the lower
        // half and the odd slots from the back of the upper half: reversing
        // each half keeps median duplicates as far apart as possible.
        vector<int> ordered(nums);
        sort(ordered.begin(), ordered.end());
        int n = (int)nums.size();
        int m = (n + 1) / 2;
        for (int k = 0; k < m; ++k) {
            nums[2 * k] = ordered[m - 1 - k];
        }
        for (int k = 0; k < n - m; ++k) {
            nums[2 * k + 1] = ordered[n - 1 - k];
        }
        return nums;
    }
};
