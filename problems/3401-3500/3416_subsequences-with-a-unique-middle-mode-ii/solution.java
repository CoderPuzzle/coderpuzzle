import java.util.HashMap;
import java.util.Map;

class Solution {

    private static final long MOD = 1_000_000_007L;

    public int subsequencesWithMiddleMode(int[] nums) {
        int n = nums.length;
        Map<Integer, Integer> total = new HashMap<>();
        for (int x : nums) {
            total.merge(x, 1, Integer::sum);
        }
        // Exact power-sum aggregates over left-side counts lw, kept as true
        // longs (bounded by n^3 <= 1e15) so every division by 2 below
        // happens on a genuine integer.
        Map<Integer, Integer> left = new HashMap<>();
        long S1 = 0,
            S2 = 0,
            S3 = 0; // sum lw, sum lw^2, sum lw^3
        long T1 = 0,
            T2 = 0,
            T3 = 0; // sum lw*cnt, sum lw*cnt^2, sum lw^2*cnt
        long SC2 = 0;
        for (int c : total.values()) {
            SC2 += (long) c * c;
        }

        long answer = 0;
        for (int i = 0; i < n; ++i) {
            int v = nums[i];
            int cntv = total.get(v);
            int l = left.getOrDefault(v, 0);
            int r = cntv - l - 1; // the middle occurrence is on neither side
            long NL = i - l; // non-v elements left of i
            long NR = n - 1 - i - r; // non-v elements right of i

            // Per-value sums over w != v, rebuilt from the aggregates. For
            // v itself the moment value cnt - l still contains the middle
            // element, so its exclusion squares (r + 1).
            long sumLw2 = S2 - (long) l * l;
            long sumLw = S1 - l;
            long sumRw2 = SC2 - 2 * T1 + S2 - (long) (r + 1) * (r + 1);
            long sumRw = n - 1 - i - r;
            long sumLwRw = T1 - (long) l * cntv - sumLw2;
            long sumLwRw2 = T2 - (long) l * cntv * cntv - 2 * (T3 - (long) l * l * cntv) + (S3 - (long) l * l * l);
            long sumLw2Rw = T3 - (long) l * l * cntv - (S3 - (long) l * l * l);
            long sumC2rw = (sumRw2 - sumRw) / 2;
            long sumC2lw = (sumLw2 - sumLw) / 2;
            // sum_w lw*rw*(NR - rw) and sum_w rw*lw*(NL - lw)
            long d10 = NR * sumLwRw - sumLwRw2;
            long d01 = NL * sumLwRw - sumLw2Rw;

            // Count by f, the frequency of v inside the subsequence. With
            // f >= 3 no other value can catch up, so only f = 2 needs the
            // inclusion-exclusion on the three non-v fills.
            long c2l = c2(l),
                c2r = c2(r);
            long val = cm(c2l, c2r); // f = 5
            val += (cm(l, c2r) * NL + cm(c2l, r) * NR) % MOD; // f = 4
            val += cm(c2r, c2(NL)) + cm(cm(l, r), NL * NR) + cm(c2l, c2(NR)); // f = 3
            // f = 2: one more v on the left (or right), the three non-v
            // fills pairwise distinct.
            long g10 = mod(NL * c2(NR) - NL * sumC2rw - d10);
            val += (l * g10) % MOD;
            long g01 = mod(c2(NL) * NR - NR * sumC2lw - d01);
            val += (r * g01) % MOD;

            answer = (answer + val) % MOD;

            // nums[i] joins the left side for every later middle.
            long old = l;
            S1 += 1;
            S2 += 2 * old + 1;
            S3 += 3 * old * old + 3 * old + 1;
            T1 += cntv;
            T2 += (long) cntv * cntv;
            T3 += cntv * (2 * old + 1);
            left.put(v, l + 1);
        }
        return (int) answer;
    }

    private static long c2(long x) {
        return x >= 2 ? (x * (x - 1)) / 2 : 0;
    }

    private static long cm(long a, long b) {
        return ((a % MOD) * (b % MOD)) % MOD;
    }

    private static long mod(long x) {
        long m = x % MOD;
        return m < 0 ? m + MOD : m;
    }
}
