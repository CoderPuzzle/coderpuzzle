import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[][] findMissingRanges(int[] nums, int lower, int upper) {
        List<int[]> ranges = new ArrayList<>();
        // prev trails just behind the elements already visited; seeding it
        // with lower - 1 makes the gap before the first element an ordinary
        // interior gap instead of a special case.
        int prev = lower - 1;
        for (int value : nums) {
            // A step of at least two between prev and value means at least
            // one integer sits strictly between them — one maximal gap,
            // because nums is sorted and unique.
            if (value - prev >= 2) {
                ranges.add(new int[] { prev + 1, value - 1 });
            }
            prev = value;
        }
        // The tail is the same test with upper standing in as the final
        // boundary: a spread of at least one closes the gap, if any, after
        // the last element.
        if (upper - prev >= 1) {
            ranges.add(new int[] { prev + 1, upper });
        }
        return ranges.toArray(new int[0][]);
    }
}
