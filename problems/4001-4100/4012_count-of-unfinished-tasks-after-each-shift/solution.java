class Solution {

    public int[] countTasks(int[] tasks, int[] shifts) {
        int n = tasks.length;
        long[] pref = new long[n];
        long acc = 0;
        for (int i = 0; i < n; i++) {
            acc += tasks[i];
            pref[i] = acc;
        }
        long total = acc;
        long done = 0;
        int[] out = new int[shifts.length];
        for (int j = 0; j < shifts.length; j++) {
            // done is the cumulative work finished within the current pass;
            // reaching the total ends the pass and discards unused time.
            done += shifts[j];
            if (done >= total) {
                out[j] = 0;
                done = 0;
                continue;
            }
            // Right-biased search counts boundary landings as complete:
            // pref[i] <= done means task i is fully finished, and the next
            // task holds all partial work.
            int lo = 0,
                hi = n;
            while (lo < hi) {
                int mid = (lo + hi) >>> 1;
                if (pref[mid] <= done) lo = mid + 1;
                else hi = mid;
            }
            out[j] = n - lo;
        }
        return out;
    }
}
