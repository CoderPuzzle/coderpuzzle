class Solution {
  public:
    int subarraysDivByK(vector<int> &nums, int k) {
        // A subarray's sum is the difference of two prefix sums, and that
        // difference is divisible by k exactly when both prefixes leave the
        // same remainder. An array counting each normalized remainder seen
        // so far, seeded with the empty prefix's 0, answers the lookup in
        // O(1) per step.
        int count = 0;
        int prefix = 0;
        vector<int> remainders(k, 0);
        remainders[0] = 1;
        for (int value : nums) {
            prefix += value;
            int r = ((prefix % k) + k) % k;
            count += remainders[r];
            ++remainders[r];
        }
        return count;
    }
};
