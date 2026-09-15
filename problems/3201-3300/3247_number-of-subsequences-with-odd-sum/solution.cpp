class Solution {
  public:
    int subsequenceCount(vector<int> &nums) {
        // Carry the count of even-sum and odd-sum subsequences of the
        // scanned prefix; an even element doubles both counts, an odd one
        // makes both counts their sum. Values stay below 2 * (10^9 + 6),
        // which fits in an int.
        constexpr int kMod = 1000000007;
        int even = 1, odd = 0;
        for (int num : nums) {
            if (num % 2 != 0) {
                int merged = (even + odd) % kMod;
                even = merged;
                odd = merged;
            } else {
                even = (even * 2) % kMod;
                odd = (odd * 2) % kMod;
            }
        }
        return odd;
    }
};
