class Solution {
  public:
    int minElement(vector<int> &nums) {
        // Replacement acts per element, and a number's digit sum is never
        // larger than the number itself, so the answer is the smallest
        // per-element digit sum.
        int best = INT_MAX;
        for (int value : nums) {
            int digitSum = 0;
            while (value) {
                digitSum += value % 10;
                value /= 10;
            }
            // The running minimum can only decrease: every replacement
            // shrinks (or keeps) its element.
            best = min(best, digitSum);
        }
        return best;
    }
};
