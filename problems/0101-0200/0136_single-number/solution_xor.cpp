class Solution {
  public:
    int singleNumber(vector<int> &nums) {
        // XOR fold: x ^ x = 0 cancels each pair, x ^ 0 = x passes the lone
        // value through, and commutativity makes grouping order irrelevant.
        int result = 0;
        for (int value : nums) {
            result ^= value;
        }
        // Only the unpaired element survives in the accumulator.
        return result;
    }
};
