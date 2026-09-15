class Solution {
  public:
    int absDifference(vector<int> &nums, int k) {
        // Sorted ascending, the k smallest elements occupy the first k
        // slots and the k largest the last k; all values are positive, so
        // the larger sum always comes from the top end and the absolute
        // difference is just last k minus first k.
        sort(nums.begin(), nums.end());
        int small = 0, large = 0;
        for (int i = 0; i < k; ++i) {
            small += nums[i];
            large += nums[nums.size() - k + i];
        }
        return large - small;
    }
};
