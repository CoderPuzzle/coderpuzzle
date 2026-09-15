import java.util.*;

class Solution {

    // Prefix-count reduction: occurrences in [low, high] = f(high) - f(low-1).
    public int digitsCount(int d, int low, int high) {
        return (int) (countUpTo(d, high) - countUpTo(d, low - 1));
    }

    private long countUpTo(int d, long n) {
        if (n <= 0) {
            return 0;
        }
        String s = Long.toString(n);
        int length = s.length();
        long total = 0;
        // Count, per digit position, the numbers <= n with d there:
        // n = highPart * 10^power + cur * 10^power + lowPart.
        for (int i = 0; i < length; i++) {
            long highPart = i > 0 ? Long.parseLong(s.substring(0, i)) : 0;
            int cur = s.charAt(i) - '0';
            long lowPart = i + 1 < length ? Long.parseLong(s.substring(i + 1)) : 0;
            long power = 1;
            for (int k = 0; k < length - 1 - i; k++) {
                power *= 10;
            }
            if (d == 0) {
                // Leading zeros are never written: skip a zero high part, and
                // the -1 forbids a leading zero on this position.
                if (highPart >= 1) {
                    if (cur > 0) {
                        total += highPart * power;
                    } else {
                        total += (highPart - 1) * power + lowPart + 1;
                    }
                }
            } else {
                // cur > d: prefix-equal numbers may put anything below;
                // cur == d: only suffixes up to lowPart still qualify.
                if (cur > d) {
                    total += (highPart + 1) * power;
                } else if (cur == d) {
                    total += highPart * power + lowPart + 1;
                } else {
                    total += highPart * power;
                }
            }
        }
        return total;
    }
}
