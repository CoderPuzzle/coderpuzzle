import java.util.ArrayList;
import java.util.List;

class Solution {

    public int findMaxVal(int n, int[][] restrictions, int[] diff) {
        final long INF = Long.MAX_VALUE;

        // Upper bound per position from left-propagated caps and
        // restrictions. Position 0 carries the sequence's own anchor:
        // a[0] = 0, so no value can exceed what diff allows away from it.
        long[] cap = new long[n];
        java.util.Arrays.fill(cap, INF);
        cap[0] = 0;
        List<int[]> sorted = new ArrayList<>();
        for (int[] restriction : restrictions) {
            sorted.add(restriction);
        }
        sorted.sort((x, y) -> Integer.compare(x[0], y[0]));
        for (int[] restriction : sorted) {
            if (restriction[1] < cap[restriction[0]]) {
                cap[restriction[0]] = restriction[1];
            }
        }
        for (int i = 1; i < n; i++) {
            if (cap[i - 1] + diff[i - 1] < cap[i]) {
                cap[i] = cap[i - 1] + diff[i - 1];
            }
        }

        // Right pass mirrors it: a tight bound at j also caps every
        // position i < j to cap[j] + sum(diff[i..j-1]).
        for (int i = n - 2; i >= 0; i--) {
            if (cap[i + 1] + diff[i] < cap[i]) {
                cap[i] = cap[i + 1] + diff[i];
            }
        }

        // The optimal sequence attains every bound simultaneously, so the
        // largest value in it is the largest bound.
        long answer = 0;
        for (int i = 0; i < n; i++) {
            if (cap[i] > answer) {
                answer = cap[i];
            }
        }
        return (int) answer;
    }
}
