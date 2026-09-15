import java.util.Arrays;

class Solution {

    public int[] countServers(int n, int[][] logs, int x, int[] queries) {
        // In the time-sorted logs each query's hits form a contiguous run
        // (times in [q - x, q]). Answering queries in increasing order lets
        // one window serve them all; sorting indices keeps answers in place.
        Arrays.sort(logs, (a, b) -> Integer.compare(a[1], b[1]));
        Integer[] order = new Integer[queries.length];
        for (int i = 0; i < queries.length; ++i) {
            order[i] = i;
        }
        Arrays.sort(order, (a, b) -> Integer.compare(queries[a], queries[b]));
        int[] cnt = new int[n + 1];
        int[] arr = new int[queries.length];
        int distinct = 0;
        int lo = 0,
            hi = 0;
        for (int idx : order) {
            int top = queries[idx];
            int bottom = top - x;
            // <= admits a log at exactly q; strict < keeps q - x inside,
            // so both interval edges stay inclusive.
            while (hi < logs.length && logs[hi][1] <= top) {
                if (++cnt[logs[hi][0]] == 1) distinct++;
                hi++;
            }
            while (lo < hi && logs[lo][1] < bottom) {
                if (--cnt[logs[lo][0]] == 0) distinct--;
                lo++;
            }
            arr[idx] = n - distinct;
        }
        return arr;
    }
}
