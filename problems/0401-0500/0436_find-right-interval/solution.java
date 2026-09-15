import java.util.Arrays;

class Solution {

    public int[] findRightInterval(int[][] intervals) {
        // The right interval question is a lower-bound query: pair each
        // start with its index, sort by start, and the answer for an end is
        // the first pair whose start reaches it.
        int n = intervals.length;
        int[][] order = new int[n][2];
        for (int i = 0; i < n; ++i) {
            order[i][0] = intervals[i][0];
            order[i][1] = i;
        }
        Arrays.sort(order, (a, b) -> Integer.compare(a[0], b[0]));
        int[] result = new int[n];
        for (int i = 0; i < n; ++i) {
            int end = intervals[i][1];
            // Smallest slot whose start is >= end; n if none. The kept half
            // always contains that boundary, so the window halves until only
            // the boundary is left.
            int lo = 0,
                hi = n;
            while (lo < hi) {
                int mid = (lo + hi) / 2;
                if (order[mid][0] < end) {
                    lo = mid + 1;
                } else {
                    hi = mid;
                }
            }
            // i may equal j: an end its own start already reaches finds the
            // interval itself; off the end means no start qualifies.
            result[i] = lo < n ? order[lo][1] : -1;
        }
        return result;
    }
}
