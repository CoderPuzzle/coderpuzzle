class Solution {
  public:
    int semiOrderedPermutation(vector<int> &nums) {
        int n = nums.size();
        int i = 0;
        int j = 0;
        for (int k = 0; k < n; k++) {
            if (nums[k] == 1) {
                i = k;
            }
            if (nums[k] == n) {
                j = k;
            }
        }
        return i + (n - 1 - j) - (i > j ? 1 : 0);
    }
};
