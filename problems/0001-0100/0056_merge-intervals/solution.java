import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

class Solution {

    public int[][] merge(int[][] intervals) {
        // Sort by start (end as tiebreaker) so any interval overlapping an
        // earlier one must overlap or touch the most recent merged interval;
        // a sweep that only tracks the last merged interval then suffices.
        // Sorting the clone leaves the input untouched.
        int[][] ordered = intervals.clone();
        Arrays.sort(ordered, Comparator.<int[]>comparingInt(a -> a[0]).thenComparingInt(a -> a[1]));
        List<int[]> merged = new ArrayList<>();
        for (int[] interval : ordered) {
            int start = interval[0];
            int end = interval[1];
            // `<=` counts touching intervals as overlapping, as required.
            // The start is already covered, so only the right edge matters.
            if (!merged.isEmpty() && start <= merged.get(merged.size() - 1)[1]) {
                int[] last = merged.get(merged.size() - 1);
                // Raise the right edge when larger; an interval fully
                // swallowed by the merge leaves it untouched.
                if (end > last[1]) {
                    last[1] = end;
                }
            } else {
                // No overlap with the last merged interval: new group.
                merged.add(new int[] { start, end });
            }
        }
        return merged.toArray(new int[0][]);
    }
}
