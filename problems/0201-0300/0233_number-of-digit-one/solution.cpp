class Solution {
  public:
    int countDigitOne(int n) {
        if (n <= 0) {
            return 0;
        }
        long long count = 0;
        long long factor = 1;
        // One iteration per decimal place: count numbers in 0..n whose
        // digit at this place is 1, with n split around the place as
        // higher / current / lower.
        while (factor <= n) {
            long long higher = n / (factor * 10);
            long long current = (n / factor) % 10;
            long long lower = n % factor;
            // The place cycles 0-9 with period 10*factor, each full cycle
            // holding factor ones -> the higher*factor base term.
            if (current == 0) {
                count += higher * factor;
            } else if (current == 1) {
                // Partial cycle reached the 1 block: every lower value
                // counts, plus the zero case -> lower + 1 extra ones.
                count += higher * factor + lower + 1;
            } else {
                // Digit >= 2 covers the whole block of factor ones.
                count += (higher + 1) * factor;
            }
            factor *= 10;
        }
        return (int)count;
    }
};
