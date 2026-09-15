class Solution {
  public:
    bool divideArray(vector<int> &nums) {
        // Values are bounded to [1, 500], so a fixed counting table answers
        // "is every value's occurrence count even?" in one pass.
        vector<int> counts(501, 0);
        for (int value : nums) {
            counts[value]++;
        }
        for (int count : counts) {
            if (count % 2 != 0) {
                return false;
            }
        }
        return true;
    }
};
