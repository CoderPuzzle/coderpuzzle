class Solution {
  public:
    int getLeastFrequentDigit(int n) {
        // Count each digit into its bucket by peeling digits off with % and
        // /; the digit itself indexes a fixed array of ten counters.
        vector<int> counts(10, 0);
        while (n > 0) {
            counts[n % 10]++;
            n /= 10;
        }
        // Ascending scan with a strict comparison keeps the smallest digit
        // on ties; empty buckets never qualify.
        int best = -1;
        for (int digit = 0; digit < 10; digit++) {
            if (counts[digit] > 0 && (best == -1 || counts[digit] < counts[best])) {
                best = digit;
            }
        }
        return best;
    }
};
