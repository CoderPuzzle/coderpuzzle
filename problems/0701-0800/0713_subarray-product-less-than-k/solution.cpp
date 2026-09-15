class Solution {
  public:
    int numSubarrayProductLessThanK(vector<int> &nums, int k) {
        // Products are at least 1 (elements >= 1), so k <= 1 admits nothing.
        if (k <= 1) {
            return 0;
        }
        int count = 0;
        long long product = 1;
        int left = 0;
        for (int right = 0; right < (int)nums.size(); right++) {
            product *= nums[right];
            // Shrink from the left until [left, right] is the longest window
            // ending here with product strictly below k.
            while (product >= k) {
                product /= nums[left];
                left++;
            }
            // Every subwindow also ends at right and has a smaller product:
            // right - left + 1 subarrays, each counted once by its right end.
            count += right - left + 1;
        }
        return count;
    }
};
