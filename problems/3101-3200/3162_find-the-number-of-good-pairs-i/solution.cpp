class Solution {
  public:
    int numberOfPairs(vector<int> &nums1, vector<int> &nums2, int k) {
        // The constraints are tiny (50 x 50), so the direct double loop
        // wins: for every value in nums2 build the divisor nums2[j] * k and
        // count how many values of nums1 it divides.
        int total = 0;
        for (int value : nums1) {
            for (int base : nums2) {
                int divisor = base * k;
                if (value % divisor == 0) {
                    ++total;
                }
            }
        }
        return total;
    }
};
