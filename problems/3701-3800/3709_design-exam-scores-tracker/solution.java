import java.util.ArrayList;
import java.util.List;

// Append-only timeline with running prefix totals: chronological calls
// keep `times` sorted, so a query binary-searches the window
// [startTime, endTime] and subtracts two prefix totals.
class ExamTracker {

    private final List<Integer> times = new ArrayList<>();
    // Held in long: up to 10^5 scores of 10^9 push totals near 10^14,
    // far past 32-bit range.
    private final List<Long> sums = new ArrayList<>();

    public ExamTracker() {}

    public void record(int time, int score) {
        times.add(time);
        sums.add(sums.isEmpty() ? score : sums.get(sums.size() - 1) + score);
    }

    public long totalScore(int startTime, int endTime) {
        int left = lowerBound(startTime);
        int right = upperBound(endTime) - 1;
        if (left > right) {
            return 0;
        }
        long total = sums.get(right);
        if (left > 0) {
            total -= sums.get(left - 1);
        }
        return total;
    }

    private int lowerBound(int value) {
        int low = 0;
        int high = times.size();
        while (low < high) {
            int mid = (low + high) >>> 1;
            if (times.get(mid) < value) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        return low;
    }

    private int upperBound(int value) {
        int low = 0;
        int high = times.size();
        while (low < high) {
            int mid = (low + high) >>> 1;
            if (times.get(mid) <= value) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        return low;
    }
}
