class Solution {
  public:
    int waysToMakeFair(vector<int> &nums) {
        // Removing index i leaves every earlier element on its own index
        // and slides every later one down a slot, flipping the suffix's
        // parity: the after-removal even sum is the prefix's even sum
        // plus the suffix's odd sum, and vice versa for odd. Four running
        // totals (even/odd sums of the visited prefix and of the
        // untouched suffix) test each candidate removal in O(1).
        int n = (int)nums.size();
        long long leftEven = 0, leftOdd = 0, rightEven = 0, rightOdd = 0;
        for (int i = 0; i < n; ++i) {
            if (i % 2 == 0) {
                rightEven += nums[i];
            } else {
                rightOdd += nums[i];
            }
        }
        int count = 0;
        for (int i = 0; i < n; ++i) {
            int value = nums[i];
            if (i % 2 == 0) {
                rightEven -= value;
            } else {
                rightOdd -= value;
            }
            if (leftEven + rightOdd == leftOdd + rightEven) {
                ++count;
            }
            if (i % 2 == 0) {
                leftEven += value;
            } else {
                leftOdd += value;
            }
        }
        return count;
    }
};
