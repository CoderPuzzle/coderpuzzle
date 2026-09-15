class Solution {
  public:
    int generateKey(int num1, int num2, int num3) {
        // Digit i of the key is the minimum of the three numbers' ith digits,
        // counted from the left of their zero-padded four-digit forms; the
        // integer result drops any leading zeros by construction.
        int key = 0;
        for (int place = 1000; place > 0; place /= 10) {
            int digit = std::min(num1 / place % 10, std::min(num2 / place % 10, num3 / place % 10));
            key = key * 10 + digit;
        }
        return key;
    }
};
