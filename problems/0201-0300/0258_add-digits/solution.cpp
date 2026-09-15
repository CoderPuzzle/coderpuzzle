class Solution {
  public:
    int addDigits(int num) {
        // The statement's own process, carried out literally: while the value
        // has more than one digit, replace it by the sum of its digits.
        while (num >= 10) {
            // One round: peel digits off the low end into a running sum.
            int total = 0;
            for (int value = num; value > 0; value /= 10) {
                total += value % 10;
            }
            num = total;
        }
        return num;
    }
};
