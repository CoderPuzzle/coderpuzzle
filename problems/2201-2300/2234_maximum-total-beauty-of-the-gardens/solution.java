import java.util.Arrays;

class Solution {

    public long maximumBeauty(int[] flowers, long newFlowers, int target, int full, int partial) {
        Arrays.sort(flowers);
        int n = flowers.length;
        long[] prefix = new long[n + 1];
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + flowers[i];
        }
        int n2 = n;
        long best = 0;
        long budget = newFlowers;
        for (int complete = 0; complete <= n2; complete++) {
            if (complete > 0) {
                long need = Math.max(0, (long) target - flowers[n2 - complete]);
                if (budget < need) {
                    break;
                }
                budget -= need;
            }
            int rest = n2 - complete;
            if (rest == 0) {
                best = Math.max(best, (long) complete * full);
                break;
            }
            if (flowers[rest - 1] >= target) {
                // every remaining garden is already complete; that split is
                // dominated by completing all of them for free.
                continue;
            }
            long low = flowers[0];
            long high = (long) target - 1;
            long bestMin = low;
            while (low <= high) {
                long mid = (low + high) / 2;
                // first index in [0, rest) with flowers[idx] >= mid
                int lo = 0;
                int hi = rest;
                while (lo < hi) {
                    int midIdx = (lo + hi) >>> 1;
                    if (flowers[midIdx] >= mid) {
                        hi = midIdx;
                    } else {
                        lo = midIdx + 1;
                    }
                }
                long cost = mid * lo - prefix[lo];
                if (cost <= budget) {
                    bestMin = mid;
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }
            best = Math.max(best, (long) complete * full + bestMin * partial);
        }
        return best;
    }
}
