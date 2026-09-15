class Solution {
  public:
    int pivotIndex(vector<int> &nums) {
        // One pass over prefix sums: the total and a running left sum give
        // both sides of index i, since right = total - left - nums[i].
        int total = 0;
        for (int x : nums) {
            total += x;
        }
        int left = 0;
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            if (left == total - left - nums[i]) {
                // The first qualifying index is the leftmost by construction.
                return i;
            }
            left += nums[i];
        }
        return -1;
    }
};
