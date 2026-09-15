class Solution {
  public:
    bool checkDivisibility(int n) {
        int total = 0, product = 1;
        for (int rest = n; rest > 0; rest /= 10) {
            int digit = rest % 10;
            total += digit;
            product *= digit;
        }
        // Digit sum >= 1 always, so the divisor never hits zero.
        return n % (total + product) == 0;
    }
};
