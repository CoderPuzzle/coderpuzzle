import java.util.ArrayList;
import java.util.List;

class SummaryRanges {

    // Sorted disjoint [start, end] intervals, merged at add time; addNum
    // binary-searches the starts for the value's slot and repairs at most
    // the two neighbors; getIntervals hands out a copy.
    private final List<int[]> intervals = new ArrayList<>();

    public SummaryRanges() {}

    public void addNum(int value) {
        int low = 0;
        int high = intervals.size();
        while (low < high) {
            int middle = (low + high) >>> 1;
            if (intervals.get(middle)[0] < value) {
                low = middle + 1;
            } else {
                high = middle;
            }
        }
        int index = low;
        boolean touchesLeft = index > 0 && intervals.get(index - 1)[1] + 1 >= value;
        boolean touchesRight = index < intervals.size() && intervals.get(index)[0] - 1 <= value;
        if (touchesLeft && touchesRight) {
            // value welds the two neighbors into one interval.
            intervals.get(index - 1)[1] = intervals.get(index)[1];
            intervals.remove(index);
        } else if (touchesLeft) {
            // Extend the left neighbor; a value it already covers is a no-op.
            int[] left = intervals.get(index - 1);
            left[1] = Math.max(left[1], value);
        } else if (touchesRight) {
            intervals.get(index)[0] = value;
        } else {
            intervals.add(index, new int[] { value, value });
        }
    }

    public int[][] getIntervals() {
        int[][] summary = new int[intervals.size()][];
        for (int index = 0; index < intervals.size(); ++index) {
            int[] interval = intervals.get(index);
            summary[index] = new int[] { interval[0], interval[1] };
        }
        return summary;
    }
}
