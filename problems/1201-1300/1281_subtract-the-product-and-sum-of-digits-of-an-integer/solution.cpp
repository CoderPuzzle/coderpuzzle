// Peel digits from the right: n % 10 is the last digit, n / 10 discards
// it. Product and sum absorb each digit as it comes off.
class Solution {
  public:
    int subtractProductAndSum(int n) {
        int product = 1;
        int total = 0;
        while (n > 0) {
            int digit = n % 10;
            product *= digit;
            total += digit;
            n /= 10;
        }
        return product - total;
    }
};
