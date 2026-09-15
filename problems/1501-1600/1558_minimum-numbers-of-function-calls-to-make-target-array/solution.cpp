class Solution {
  public:
    int minOperations(vector<int> &nums) {
        // Each element's popcount is the number of independent increments
        // it needs; the doublings are shared by the whole array, so only
        // the element with the most bits sets how many doublings are
        // needed.
        int total = 0;
        int maxBits = 0;
        for (int v : nums) {
            total += __builtin_popcount(static_cast<unsigned int>(v));
            int bits = v == 0 ? 0 : 32 - __builtin_clz(static_cast<unsigned int>(v));
            maxBits = std::max(maxBits, bits);
        }
        return total + std::max(maxBits - 1, 0);
    }
};
