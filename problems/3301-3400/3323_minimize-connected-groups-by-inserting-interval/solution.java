import java.util.Arrays;
import java.util.Comparator;

class Solution {

    public int minConnectedGroups(int[][] intervals, int k) {
        // Only the merged components matter: sort the intervals, merge the
        // overlapping ones, and the answer is the component count minus the
        // largest number of consecutive components one new interval can
        // straddle. A new interval of length at most k joins components l
        // through r exactly when their end-to-end span, c_r.start -
        // c_l.end, is at most k (the interval must reach across every
        // component in between, not just the empty gaps). Both endpoint
        // bounds move monotonically, so two pointers find the widest valid
        // window: advance the right end and shrink from the left while the
        // span exceeds k. All coordinates fit in int, so every span does
        // too (the span is at most 10^9).
        Arrays.sort(intervals, Comparator.comparingInt(a -> a[0]));
        int[][] merged = new int[intervals.length][];
        int size = 0;
        for (int[] interval : intervals) {
            if (size > 0 && interval[0] <= merged[size - 1][1]) {
                merged[size - 1][1] = Math.max(merged[size - 1][1], interval[1]);
            } else {
                merged[size++] = interval;
            }
        }
        int best = 0;
        int left = 0;
        for (int right = 0; right < size; ++right) {
            while (merged[right][0] - merged[left][1] > k) {
                ++left;
            }
            best = Math.max(best, right - left);
        }
        return size - best;
    }
}
