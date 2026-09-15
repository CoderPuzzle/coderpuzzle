class Solution {
  public:
    int minimumSwaps(vector<int> &nums) {
        int n = nums.size();
        int i = 0;
        for (int k = 1; k < n; k++) {
            if (nums[k] < nums[i]) {
                i = k;
            }
        }
        int j = n - 1;
        for (int k = n - 2; k >= 0; k--) {
            if (nums[k] > nums[j]) {
                j = k;
            }
        }
        return i + (n - 1 - j) - (j < i);
    }
};
