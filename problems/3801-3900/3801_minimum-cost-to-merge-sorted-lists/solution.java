import java.util.Arrays;

class Solution {

    public long minMergeCost(int[][] lists) {
        int n = lists.length;
        int size = 1 << n;

        // Total length of every mask, built up from its lowest set bit.
        long[] totalLen = new long[size];
        for (int mask = 1; mask < size; mask++) {
            int low = mask & -mask;
            int idx = Integer.numberOfTrailingZeros(low);
            totalLen[mask] = totalLen[mask ^ low] + lists[idx].length;
        }

        // Left-middle median of every mask, found without materializing the
        // merged list: binary search the sorted value pool for the smallest
        // value with more than half the mask's elements at or below it.
        int poolLen = 0;
        for (int[] one : lists) {
            poolLen += one.length;
        }
        int[] vals = new int[poolLen];
        int pos = 0;
        for (int[] one : lists) {
            System.arraycopy(one, 0, vals, pos, one.length);
            pos += one.length;
        }
        Arrays.sort(vals);
        long[] med = new long[size];
        for (int mask = 1; mask < size; mask++) {
            int rank = (int) ((totalLen[mask] - 1) / 2);
            int lo = 0;
            int hi = vals.length - 1;
            while (lo < hi) {
                int mid = (lo + hi) >>> 1;
                int cnt = 0;
                for (int i = 0; i < n; i++) {
                    if (((mask >> i) & 1) == 1) {
                        cnt += upperBound(lists[i], vals[mid]);
                    }
                }
                if (cnt > rank) {
                    hi = mid;
                } else {
                    lo = mid + 1;
                }
            }
            med[mask] = vals[lo];
        }

        // dp over subsets: the last merge of a mask always pays the mask's
        // total length plus the gap between the two merged-in medians, so
        // only the split itself is a free choice.
        final long INF = Long.MAX_VALUE / 4;
        long[] dp = new long[size];
        Arrays.fill(dp, INF);
        for (int mask = 1; mask < size; mask++) {
            if ((mask & (mask - 1)) == 0) {
                dp[mask] = 0;
                continue;
            }
            long best = INF;
            for (int sub = (mask - 1) & mask; sub != 0; sub = (sub - 1) & mask) {
                int other = mask ^ sub;
                if (sub < other) {
                    // each unordered split exactly once
                    long cost = dp[sub] + dp[other] + totalLen[mask] + Math.abs(med[sub] - med[other]);
                    if (cost < best) {
                        best = cost;
                    }
                }
            }
            dp[mask] = best;
        }
        return dp[size - 1];
    }

    // Smallest index whose element exceeds key in a sorted array.
    private int upperBound(int[] arr, int key) {
        int lo = 0;
        int hi = arr.length;
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (arr[mid] <= key) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    }
}
