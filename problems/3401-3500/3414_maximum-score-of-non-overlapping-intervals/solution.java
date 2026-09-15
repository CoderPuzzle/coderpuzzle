import java.util.Arrays;

class Solution {

    public int[] maximumWeight(int[][] intervals) {
        int n = intervals.length;
        // Sort by right endpoint: every pick set is a chain in this order,
        // and sharing any point (even one boundary) means overlapping, so
        // predecessors must end strictly left of the current left end.
        Integer[] order = new Integer[n];
        for (int t = 0; t < n; ++t) {
            order[t] = t;
        }
        Arrays.sort(order, (a, b) ->
            intervals[a][1] != intervals[b][1]
                ? Integer.compare(intervals[a][1], intervals[b][1])
                : Integer.compare(intervals[a][0], intervals[b][0])
        );
        int[] rights = new int[n];
        for (int t = 0; t < n; ++t) {
            rights[t] = intervals[order[t]][1];
        }

        final long neg = Long.MIN_VALUE / 2;
        // Layer k: over prefix length i, best score picking exactly k of
        // the first i sorted intervals, plus the lexicographically
        // smallest index tuple achieving it (at most 4 slots).
        long[] prevScore = new long[n + 1];
        long[] curScore = new long[n + 1];
        int[][] prevTuple = new int[n + 1][];
        int[][] curTuple = new int[n + 1][];
        for (int i = 0; i <= n; ++i) {
            prevScore[i] = 0;
            prevTuple[i] = new int[0];
        }
        long[] bestScore = new long[5];
        int[][] bestTuple = new int[5][];
        for (int k = 1; k <= 4; ++k) {
            curScore[0] = neg;
            curTuple[0] = new int[0];
            for (int i = 1; i <= n; ++i) {
                curScore[i] = curScore[i - 1];
                curTuple[i] = curTuple[i - 1];
                int idx = order[i - 1];
                int left = intervals[idx][0];
                long weight = intervals[idx][2];
                int j = lowerBound(rights, left);
                if (prevScore[j] > neg / 4) {
                    long candScore = prevScore[j] + weight;
                    int[] candTuple = insert(prevTuple[j], idx);
                    // Score first; on a tie the smaller index tuple wins.
                    if (candScore > curScore[i] || (candScore == curScore[i] && less(candTuple, curTuple[i]))) {
                        curScore[i] = candScore;
                        curTuple[i] = candTuple;
                    }
                }
            }
            bestScore[k] = curScore[n];
            bestTuple[k] = curTuple[n];
            long[] ts = prevScore;
            prevScore = curScore;
            curScore = ts;
            int[][] tt = prevTuple;
            prevTuple = curTuple;
            curTuple = tt;
        }

        long top = Long.MIN_VALUE;
        for (int k = 1; k <= 4; ++k) {
            top = Math.max(top, bestScore[k]);
        }
        int[] winner = null;
        for (int k = 1; k <= 4; ++k) {
            if (bestScore[k] == top && (winner == null || less(bestTuple[k], winner))) {
                winner = bestTuple[k];
            }
        }
        return winner;
    }

    // Largest j with rights[j] < left; the array is sorted ascending.
    private int lowerBound(int[] rights, int left) {
        int lo = 0,
            hi = rights.length;
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (rights[mid] < left) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    }

    // Insert idx keeping ascending order (input tuples are sorted).
    private int[] insert(int[] tuple, int idx) {
        int[] out = new int[tuple.length + 1];
        int pos = tuple.length;
        while (pos > 0 && tuple[pos - 1] > idx) {
            out[pos] = tuple[pos - 1];
            --pos;
        }
        out[pos] = idx;
        System.arraycopy(tuple, 0, out, 0, pos);
        return out;
    }

    // Lexicographic order on ascending tuples; a shorter prefix is smaller.
    private boolean less(int[] a, int[] b) {
        for (int t = 0; t < Math.max(a.length, b.length); ++t) {
            int va = t < a.length ? a[t] : -1;
            int vb = t < b.length ? b[t] : -1;
            if (va != vb) {
                return va < vb;
            }
        }
        return false;
    }
}
