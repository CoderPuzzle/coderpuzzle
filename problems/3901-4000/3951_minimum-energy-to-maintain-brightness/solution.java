import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

class Solution {

    public long minEnergy(int n, int brightness, int[][] intervals) {
        long bulbs = (brightness + 2L) / 3;
        Arrays.sort(intervals, Comparator.comparingInt(a -> a[0]));
        List<int[]> merged = new ArrayList<>();
        for (int[] interval : intervals) {
            if (!merged.isEmpty() && interval[0] <= merged.get(merged.size() - 1)[1] + 1) {
                merged.get(merged.size() - 1)[1] = Math.max(merged.get(merged.size() - 1)[1], interval[1]);
            } else {
                merged.add(new int[] { interval[0], interval[1] });
            }
        }
        long activeTime = 0;
        for (int[] interval : merged) activeTime += interval[1] - interval[0] + 1L;
        return bulbs * activeTime;
    }
}
