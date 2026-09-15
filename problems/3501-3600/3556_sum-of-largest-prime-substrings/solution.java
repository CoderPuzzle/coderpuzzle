import java.util.*;

class Solution {

    // Collect distinct substring values (leading zeros vanish on parse),
    // walk them from the largest down, and primality-test each by trial
    // division until three primes have been summed.
    public long sumOfLargestPrimes(String s) {
        int n = s.length();
        Set<Long> values = new HashSet<>();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j <= n; j++) {
                values.add(Long.parseLong(s.substring(i, j)));
            }
        }
        List<Long> sorted = new ArrayList<>(values);
        Collections.sort(sorted, Collections.reverseOrder());
        long total = 0;
        int found = 0;
        for (long v : sorted) {
            if (isPrime(v)) {
                total += v;
                found++;
                if (found == 3) {
                    break;
                }
            }
        }
        return total;
    }

    private boolean isPrime(long v) {
        if (v < 2) {
            return false;
        }
        if (v % 2 == 0) {
            return v == 2;
        }
        for (long f = 3; f * f <= v; f += 2) {
            if (v % f == 0) {
                return false;
            }
        }
        return true;
    }
}
