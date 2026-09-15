import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public int threeSumMulti(int[] arr, int target) {
        // Count occurrences of each value, then enumerate value pairs
        // (a, b) with a <= b; the required third value c = target - a - b
        // is accepted only when c >= b, so each unordered value multiset
        // {a, b, c} is priced exactly once. The index count is C(ca, 3)
        // when a == b == c, C(ca, 2) * cc or ca * C(cb, 2) when exactly
        // two coincide, and ca * cb * cc when all three differ — each
        // term reduced mod 10^9 + 7 as it is added, since C(3000, 3) is
        // far past 32 bits before the modulus ever fires.
        final int MOD = 1_000_000_007;
        Map<Integer, Integer> counts = new HashMap<>();
        for (int value : arr) {
            counts.merge(value, 1, Integer::sum);
        }
        List<Integer> values = new ArrayList<>(counts.keySet());
        Collections.sort(values);
        int d = values.size();
        long total = 0;
        for (int i = 0; i < d; ++i) {
            int a = values.get(i);
            long ca = counts.get(a);
            for (int j = i; j < d; ++j) {
                int b = values.get(j);
                int c = target - a - b;
                if (c < b) {
                    break;
                }
                Integer boxed = counts.get(c);
                if (boxed == null) {
                    continue;
                }
                long cb = counts.get(b);
                long cc = boxed;
                long term;
                if (a == b && b == c) {
                    term = (ca * (ca - 1) * (ca - 2)) / 6;
                } else if (a == b) {
                    term = ((ca * (ca - 1)) / 2) * cc;
                } else if (b == c) {
                    term = (ca * cb * (cb - 1)) / 2;
                } else {
                    term = ca * cb * cc;
                }
                total = (total + term) % MOD;
            }
        }
        return (int) total;
    }
}
