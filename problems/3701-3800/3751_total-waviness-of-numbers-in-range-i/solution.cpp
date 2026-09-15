class Solution {
  public:
    int totalWaviness(int num1, int num2) {
        // Waviness of one number: an interior digit is a peak when it is
        // strictly greater than both neighbors and a valley when it is
        // strictly less than both; equal neighbors never count.
        auto waviness = [](int n) {
            if (n < 100) {
                return 0;
            }
            int prev = n % 10; // least significant digit so far
            n /= 10;
            int cur = n % 10;
            n /= 10;
            int w = 0;
            while (true) {
                int nxt = n % 10;
                if ((cur > prev && cur > nxt) || (cur < prev && cur < nxt)) {
                    w++;
                }
                prev = cur;
                cur = nxt;
                n /= 10;
                if (n == 0) {
                    break;
                }
            }
            return w;
        };
        // The range holds at most 10^5 numbers of at most 6 digits each,
        // so the plain enumeration the hint suggests is plenty.
        int total = 0;
        for (int x = num1; x <= num2; x++) {
            total += waviness(x);
        }
        return total;
    }
};
