class Solution {
  public:
    // Repeated division by k peels off one base-k digit at a time; the
    // digits arrive least-significant first but summing is order-free.
    int sumBase(int n, int k) {
        int total = 0;
        while (n > 0) {
            total += n % k;
            n /= k;
        }
        return total;
    }
};
