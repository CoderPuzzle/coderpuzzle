import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

class Solution {

    public long countFancy(long l, long r) {
        // Strictly increasing numbers draw digits from 1..9; strictly
        // decreasing ones from 0..9 with no leading zero. Enumerate every
        // nonempty digit subset once per direction and deduplicate.
        Set<Long> goodSet = new HashSet<>();
        for (int mask = 1; mask < 1 << 9; mask++) {
            long num = 0;
            for (int d = 1; d <= 9; d++) {
                if ((mask & (1 << (d - 1))) != 0) num = num * 10 + d;
            }
            goodSet.add(num);
        }
        for (int mask = 1; mask < 1 << 10; mask++) {
            long num = 0;
            for (int d = 9; d >= 0; d--) {
                if ((mask & (1 << d)) != 0) num = num * 10 + d;
            }
            if (num > 0) goodSet.add(num);
        }
        List<Long> goods = new ArrayList<>(goodSet);
        Collections.sort(goods);

        // good[s] == 1 when the integer s is itself strictly monotone;
        // those are exactly the good digit sums (s in [1, 144]).
        int[] good = new int[145];
        for (long g : goodSet) {
            if (g <= 144) good[(int) g] = 1;
        }

        // overlap[i]: among goods[0..i), how many also have a good digit sum
        long[] overlap = new long[goods.size() + 1];
        for (int i = 0; i < goods.size(); i++) {
            overlap[i + 1] = overlap[i] + good[digitSum(goods.get(i))];
        }

        return countFancyUpTo(r, goods, good, overlap) - countFancyUpTo(l - 1, goods, good, overlap);
    }

    private long countFancyUpTo(long x, List<Long> goods, int[] good, long[] overlap) {
        // Fancy = good digits OR good digit sum; subtract the goods whose
        // digit sum is also good (counted by both terms).
        return countSumGood(x, good) + countGood(x, goods) - countOverlap(x, goods, overlap);
    }

    private long countGood(long x, List<Long> goods) {
        int lo = 0;
        int hi = goods.size();
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (goods.get(mid) <= x) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }

    private long countOverlap(long x, List<Long> goods, long[] overlap) {
        return overlap[(int) countGood(x, goods)];
    }

    private long countSumGood(long x, int[] good) {
        // Numbers in [1, x] whose digit sum is a good sum.
        if (x <= 0) return 0;
        String s = Long.toString(x);
        int n = s.length();
        // ways[k][t]: k free digits (0-9, leading zeros allowed) summing to
        // exactly t. Counts reach ~10^15, past 32 bits, so the table is long.
        long[][] ways = new long[n + 1][145];
        ways[0][0] = 1;
        for (int k = 1; k <= n; k++) {
            for (int t = 0; t <= 144; t++) {
                long total = 0;
                for (int d = 0; d <= 9; d++) {
                    if (t >= d) total += ways[k - 1][t - d];
                }
                ways[k][t] = total;
            }
        }
        long result = 0;
        int running = 0;
        for (int i = 0; i < n; i++) {
            int v = s.charAt(i) - '0';
            int k = n - i - 1;
            // A smaller digit here fixes the prefix; the tail is free.
            for (int d = 0; d < v; d++) {
                int base = running + d;
                int limit = Math.min(9 * k, 144 - base);
                for (int rem = 0; rem <= limit; rem++) {
                    if (good[base + rem] == 1) result += ways[k][rem];
                }
            }
            running += v;
        }
        if (good[running] == 1) result += 1;
        return result;
    }

    private int digitSum(long n) {
        int s = 0;
        while (n > 0) {
            s += n % 10;
            n /= 10;
        }
        return s;
    }
}
