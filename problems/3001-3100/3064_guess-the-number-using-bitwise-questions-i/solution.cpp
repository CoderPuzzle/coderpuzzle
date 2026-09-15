class HiddenNumber;

class Solution {
  public:
    int findNumber(HiddenNumber &hiddenNumber) {
        // A single-bit mask shares at most one bit with n, so the reply is
        // 0 or 1: positive means bit i of n itself is set.
        int number = 0;
        for (int bit = 0; bit < 30; ++bit) {
            if (hiddenNumber.commonSetBits(1 << bit) > 0) {
                number |= 1 << bit;
            }
        }
        return number;
    }
};
