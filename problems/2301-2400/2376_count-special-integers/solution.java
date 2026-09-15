class Solution {

    public int countSpecialNumbers(long n) {
        String s = Long.toString(n);
        int L = s.length();
        long total = 0;
        // Part 1: shorter lengths are all below n. A k-digit special number
        // picks a nonzero first digit, then ordered picks of the remaining 9.
        for (int k = 1; k < L; k++) {
            total += 9L * perm(9, k - 1);
        }
        // Part 2: walk n's digits, holding the prefix equal to n so far;
        // `used` is the bitmask of digits fixed in that prefix.
        int used = 0;
        boolean broke = false;
        for (int i = 0; i < L; i++) {
            int d = s.charAt(i) - '0';
            // Try each digit x < d not yet used (x >= 1 at position 0 to bar
            // leading zeros): any completion works, so count the ordered
            // picks for the remaining L-i-1 positions from unused digits.
            for (int x = i == 0 ? 1 : 0; x < d; x++) {
                if (((used >> x) & 1) == 0) {
                    total += perm(10 - (i + 1), L - i - 1);
                }
            }
            // Extending with d itself repeats a digit: no same-length
            // special number shares this prefix, so the walk stops.
            if (((used >> d) & 1) == 1) {
                broke = true;
                break;
            }
            used |= 1 << d;
        }
        if (!broke) {
            // The walk finished with no repeat, so n itself is special.
            total += 1;
        }
        return (int) total;
    }

    private long perm(long a, int k) {
        long p = 1;
        for (int i = 0; i < k; i++) {
            p *= a - i;
        }
        return p;
    }
}
