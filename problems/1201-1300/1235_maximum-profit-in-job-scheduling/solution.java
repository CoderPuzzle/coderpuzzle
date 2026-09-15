import java.util.Arrays;

class Solution {

    public int jobScheduling(int[] startTime, int[] endTime, int[] profit) {
        int n = startTime.length;
        // Weighted interval scheduling: pack as (end, start, profit) so jobs
        // come out in end-time order and best[i] is final before it is read.
        int[][] jobs = new int[n][3];
        for (int i = 0; i < n; i++) {
            jobs[i][0] = endTime[i];
            jobs[i][1] = startTime[i];
            jobs[i][2] = profit[i];
        }
        Arrays.sort(jobs, (a, b) -> {
            if (a[0] != b[0]) return Integer.compare(a[0], b[0]);
            if (a[1] != b[1]) return Integer.compare(a[1], b[1]);
            return Integer.compare(a[2], b[2]);
        });
        int[] ends = new int[n];
        for (int i = 0; i < n; i++) ends[i] = jobs[i][0];

        // best[i] = max profit using only the first i jobs; best[0] = 0 anchors it.
        long[] best = new long[n + 1];
        for (int i = 1; i <= n; i++) {
            int[] job = jobs[i - 1];
            // bisectRight => a job starting exactly when another ends does not
            // overlap; restricting to the first i-1 entries keeps predecessors
            // inside the processed prefix.
            int j = bisectRight(ends, job[1], i - 1);
            // Skip job i (inherit best[i-1]) or take it on top of best[j].
            best[i] = Math.max(best[i - 1], best[j] + job[2]);
        }
        return (int) best[n];
    }

    private int bisectRight(int[] values, int target, int hi) {
        int lo = 0;
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (values[mid] <= target) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    }
}
