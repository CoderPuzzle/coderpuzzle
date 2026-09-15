import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

class Solution {

    public int[][] filterOccupiedIntervals(int[][] occupiedIntervals, int freeStart, int freeEnd) {
        Arrays.sort(occupiedIntervals, Comparator.comparingInt(a -> a[0]));
        List<int[]> merged = new ArrayList<>();
        for (int[] interval : occupiedIntervals) {
            if (!merged.isEmpty() && interval[0] <= merged.get(merged.size() - 1)[1] + 1) {
                merged.get(merged.size() - 1)[1] = Math.max(merged.get(merged.size() - 1)[1], interval[1]);
            } else {
                merged.add(new int[] { interval[0], interval[1] });
            }
        }

        List<int[]> answer = new ArrayList<>();
        for (int[] interval : merged) {
            int start = interval[0];
            int end = interval[1];
            if (freeEnd < start || freeStart > end) {
                answer.add(new int[] { start, end });
                continue;
            }
            if (freeStart > start) {
                answer.add(new int[] { start, freeStart - 1 });
            }
            if (freeEnd < end) {
                answer.add(new int[] { freeEnd + 1, end });
            }
        }
        return answer.toArray(new int[0][]);
    }
}
