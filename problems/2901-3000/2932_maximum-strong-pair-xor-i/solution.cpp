class Solution {
  public:
    int maximumStrongPairXor(vector<int> &nums) {
        // Try every unordered pair (the same integer twice is allowed, so
        // j >= i covers the (x, x) pairs too); keep the best XOR among the
        // pairs that satisfy the strong-pair condition.
        int best = 0;
        for (int i = 0; i < (int)nums.size(); ++i) {
            for (int j = i; j < (int)nums.size(); ++j) {
                int x = nums[i], y = nums[j];
                if (abs(x - y) <= min(x, y))
                    best = max(best, x ^ y);
            }
        }
        return best;
    }
};
