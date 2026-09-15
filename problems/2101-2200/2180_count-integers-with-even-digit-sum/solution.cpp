class Solution {
  public:
    int countEven(int num) {
        // num <= 1000, so checking every value's digit sum directly is
        // the whole story.
        int count = 0;
        for (int value = 1; value <= num; ++value) {
            int digitSum = 0;
            int rest = value;
            while (rest) {
                digitSum += rest % 10;
                rest /= 10;
            }
            if (digitSum % 2 == 0) {
                ++count;
            }
        }
        return count;
    }
};
