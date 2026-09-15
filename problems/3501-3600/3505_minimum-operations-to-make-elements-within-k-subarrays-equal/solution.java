import java.util.Arrays;

class Solution {

    public long minOperations(int[] nums, int x, int k) {
        // Equalizing a window costs sum(|v - t|), minimized when t is a
        // median. A sliding window over a Fenwick tree (compressed values)
        // yields every x-window's cost in O(log n): kth finds the median
        // and prefix count/sum split the window about it. A rolling DP then
        // picks k non-overlapping windows.
        int n = nums.length;
        int[] vals = Arrays.stream(nums).distinct().sorted().toArray();
        int m = vals.length;
        int[] cnt = new int[m + 1];
        long[] sm = new long[m + 1];

        int winCount = n - x + 1;
        long[] costs = new long[winCount];
        long total = 0;
        for (int i = 0; i < n; i++) {
            int idx = Arrays.binarySearch(vals, nums[i]) + 1;
            for (int p = idx; p <= m; p += p & -p) {
                cnt[p]++;
                sm[p] += nums[i];
            }
            total += nums[i];
            if (i >= x) {
                int out = Arrays.binarySearch(vals, nums[i - x]) + 1;
                for (int p = out; p <= m; p += p & -p) {
                    cnt[p]--;
                    sm[p] -= nums[i - x];
                }
                total -= nums[i - x];
            }
            if (i >= x - 1) {
                int kpos = (x + 1) / 2;
                int pos = 0;
                int acc = 0;
                for (int step = Integer.highestOneBit(m); step > 0; step >>= 1) {
                    int nxt = pos + step;
                    if (nxt <= m && acc + cnt[nxt] < kpos) {
                        pos = nxt;
                        acc += cnt[nxt];
                    }
                }
                int midIdx = pos + 1;
                int c = 0;
                long s = 0;
                for (int p = midIdx; p > 0; p -= p & -p) {
                    c += cnt[p];
                    s += sm[p];
                }
                long med = vals[midIdx - 1];
                costs[i - x + 1] = med * c - s + (total - s) - med * (x - c);
            }
        }

        long INF = Long.MAX_VALUE / 4;
        long[] prev = new long[winCount];
        for (int t = 1; t <= k; t++) {
            long[] cur = new long[winCount];
            Arrays.fill(cur, INF);
            for (int i = 0; i < winCount; i++) {
                long best = i > 0 ? cur[i - 1] : INF;
                if (t == 1) {
                    if (costs[i] < best) {
                        best = costs[i];
                    }
                } else if (i >= x) {
                    long take = costs[i] + prev[i - x];
                    if (take < best) {
                        best = take;
                    }
                }
                cur[i] = best;
            }
            prev = cur;
        }
        return prev[winCount - 1];
    }
}
