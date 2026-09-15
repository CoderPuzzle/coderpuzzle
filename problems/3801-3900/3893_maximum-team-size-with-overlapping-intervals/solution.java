import java.util.Arrays;

class Solution {

    public int maximumTeamSize(int[] startTime, int[] endTime) {
        // A team is valid when one member overlaps everyone else, so the largest
        // team is the largest set of intervals all overlapping a single interval.
        // For each interval i that is exactly the intervals j with
        // startTime[j] <= endTime[i] and endTime[j] >= startTime[i].
        int n = startTime.length;
        int[] starts = startTime.clone();
        int[] ends = endTime.clone();
        Arrays.sort(starts);
        Arrays.sort(ends);
        int best = 0;
        for (int i = 0; i < n; i++) {
            // Count starts no later than end minus ends earlier than start; the
            // second set is a subset of the first, so the difference is exactly
            // the overlapping intervals, including i itself.
            int overlap = upperBound(starts, endTime[i]) - lowerBound(ends, startTime[i]);
            if (overlap > best) {
                best = overlap;
            }
        }
        return best;
    }

    // First index greater than target: the count of values <= target.
    private int upperBound(int[] arr, int target) {
        int lo = 0;
        int hi = arr.length;
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (arr[mid] <= target) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    }

    // First index >= target: the count of values < target.
    private int lowerBound(int[] arr, int target) {
        int lo = 0;
        int hi = arr.length;
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (arr[mid] < target) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    }
}
