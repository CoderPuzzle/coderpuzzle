class Solution {
  public:
    int minimumTimeRequired(vector<int> &jobs, int k) {
        vector<int> sortedJobs = jobs;
        // Biggest jobs first: the largest loads surface at the shallowest
        // levels, where the bound tightens soonest.
        sort(sortedJobs.rbegin(), sortedJobs.rend());
        int n = sortedJobs.size();
        // Pessimistic upper bound: everything on one worker.
        long long best = 0;
        for (int j : sortedJobs)
            best += j;
        vector<long long> loads(k, 0);
        dfs(0, n, k, sortedJobs, loads, best);
        return (int)best;
    }

  private:
    static void dfs(int i, int n, int k, const vector<int> &jobs, vector<long long> &loads, long long &best) {
        if (i == n) {
            // Every complete assignment is legal; keep its max load.
            long long current = 0;
            for (long long l : loads) {
                if (l > current)
                    current = l;
            }
            if (current < best)
                best = current;
            return;
        }
        unordered_set<long long> seen;
        for (int w = 0; w < k; w++) {
            // A worker whose current load was already tried for this job
            // leads to an identical subproblem.
            if (seen.count(loads[w]))
                continue;
            seen.insert(loads[w]);
            // Bound: this placement can no longer beat best.
            if (loads[w] + jobs[i] >= best)
                continue;
            loads[w] += jobs[i];
            dfs(i + 1, n, k, jobs, loads, best);
            loads[w] -= jobs[i];
            // Empty workers are interchangeable — one trial suffices.
            if (loads[w] == 0)
                break;
        }
    }
};
