class Solution {
  public:
    bool canSortArray(vector<int> &nums) {
        int previousMax = 0;
        int currentMax = 0;
        int currentBits = 0;
        for (int value : nums) {
            int bits = __builtin_popcount(value);
            if (bits != currentBits) {
                previousMax = currentMax;
                currentBits = bits;
                currentMax = 0;
            }
            if (value < previousMax) {
                return false;
            }
            if (value > currentMax) {
                currentMax = value;
            }
        }
        return true;
    }
};
