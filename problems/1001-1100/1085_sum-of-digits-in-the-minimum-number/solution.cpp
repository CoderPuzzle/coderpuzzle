class Solution {
  public:
    int sumOfDigits(vector<int> &nums) {
        // The answer depends only on the smallest element; sum its digits
        // by peeling off the least significant digit one at a time.
        int m = *min_element(nums.begin(), nums.end());
        int digit_sum = 0;
        while (m) {
            digit_sum += m % 10;
            m /= 10;
        }
        return digit_sum % 2 ? 0 : 1;
    }
};
