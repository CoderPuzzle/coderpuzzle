class Solution {
  public:
    int specialArray(vector<int> &nums) {
        // Sort descending: for candidate x = i, the i-th largest element
        // must still be >= i while the next one drops below it (or i is
        // the last position), which is exactly "i elements are >= i".
        int n = (int)nums.size();
        vector<int> sorted_nums = nums;
        sort(sorted_nums.begin(), sorted_nums.end(), greater<int>());
        for (int i = 1; i <= n; ++i) {
            if (sorted_nums[i - 1] >= i && (i == n || sorted_nums[i] < i))
                return i;
        }
        // Every element is non-negative, so x = 0 would need an empty
        // array; nothing else worked, so the array is not special.
        return -1;
    }
};
