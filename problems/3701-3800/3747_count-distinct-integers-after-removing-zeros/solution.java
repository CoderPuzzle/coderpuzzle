class Solution {

    public long countDistinct(long n) {
        // Count the zero-free integers in [1, n] directly from n's digits,
        // peeled off arithmetically. Every shorter length contributes a
        // full block of 9^k values; then a prefix matching n so far
        // branches to any smaller nonzero digit and completes freely. The
        // walk stops at n's first zero digit — nothing below can be
        // zero-free once the prefix carries one. long holds every
        // intermediate: each block is below 9^15 < 2^48 and the total
        // stays below n <= 10^15.
        long[] digits = new long[16];
        int count = 0;
        for (long m = n; m > 0; m /= 10) digits[count++] = m % 10;
        long total = 0;
        long pow9 = 1;
        for (int k = 1; k < count; k++) {
            pow9 *= 9;
            total += pow9;
        }
        boolean tight = true;
        for (int i = count - 1; i >= 0; i--) {
            if (digits[i] > 1) total += (digits[i] - 1) * pow9;
            if (digits[i] == 0) {
                tight = false;
                break;
            }
            pow9 /= 9;
        }
        if (tight) total += 1;
        return total;
    }
}
