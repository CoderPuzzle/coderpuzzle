import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

class Solution {

    private int[] sortedJobs;
    private int[] loads;
    private long best;
    private int n;
    private int k;

    public int minimumTimeRequired(int[] jobs, int k) {
        this.sortedJobs = jobs.clone();
        Arrays.sort(this.sortedJobs);
        // reverse to descending
        // Biggest jobs first: the largest loads surface at the shallowest
        // levels, where the bound tightens soonest.
        for (int i = 0, j = this.sortedJobs.length - 1; i < j; i++, j--) {
            int t = this.sortedJobs[i];
            this.sortedJobs[i] = this.sortedJobs[j];
            this.sortedJobs[j] = t;
        }
        this.n = sortedJobs.length;
        this.k = k;
        this.loads = new int[k];
        // Pessimistic upper bound: everything on one worker.
        long total = 0;
        for (int j : sortedJobs) total += j;
        this.best = total;
        dfs(0);
        return (int) best;
    }

    private void dfs(int i) {
        if (i == n) {
            // Every complete assignment is legal; keep its max load.
            long current = 0;
            for (long l : loads) {
                if (l > current) current = l;
            }
            if (current < best) best = current;
            return;
        }
        Set<Integer> seen = new HashSet<>();
        for (int w = 0; w < k; w++) {
            // A worker whose current load was already tried for this job
            // leads to an identical subproblem.
            if (seen.contains(loads[w])) continue;
            seen.add(loads[w]);
            // Bound: this placement can no longer beat best.
            if ((long) loads[w] + sortedJobs[i] >= best) continue;
            loads[w] += sortedJobs[i];
            dfs(i + 1);
            loads[w] -= sortedJobs[i];
            // Empty workers are interchangeable — one trial suffices.
            if (loads[w] == 0) break;
        }
    }
}
