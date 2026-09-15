class Solution {
  public:
    long long maximumMedianSum(vector<int> &nums) {
        // Sorted descending, the optimal play pairs the two largest
        // remaining values with the smallest remaining one: the largest
        // is sacrificed every step (it can only be a median of a triple
        // that contains an even larger element, which is impossible to
        // arrange for all of them), so spending it on deleting the
        // smallest leftover is free. Step t therefore consumes s[2t],
        // s[2t + 1] and the t-th smallest value s[n - 1 - t], making the
        // medians the odd indices 1, 3, 5, ... -- the first n/3 of them.
        // The sum reaches ~1.7e14, past 32 bits, so long long math is
        // required.
        sort(nums.begin(), nums.end(), greater<int>());
        long long total = 0;
        for (int i = 1; i < 2 * ((int)nums.size() / 3); i += 2) {
            total += nums[i];
        }
        return total;
    }
};
