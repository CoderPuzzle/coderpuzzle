class Solution {
  public:
    int jobScheduling(vector<int> &startTime, vector<int> &endTime, vector<int> &profit) {
        int n = (int)startTime.size();
        // Weighted interval scheduling: pack as (end, start, profit) so jobs
        // come out in end-time order and best[i] is final before it is read.
        vector<array<int, 3>> jobs(n);
        for (int i = 0; i < n; i++) {
            jobs[i] = {endTime[i], startTime[i], profit[i]};
        }
        sort(jobs.begin(), jobs.end());
        vector<int> ends(n);
        for (int i = 0; i < n; i++)
            ends[i] = jobs[i][0];

        // best[i] = max profit using only the first i jobs; best[0] = 0 anchors it.
        vector<long long> best(n + 1, 0);
        for (int i = 1; i <= n; i++) {
            int start = jobs[i - 1][1];
            int p = jobs[i - 1][2];
            // upper_bound => a job starting exactly when another ends does not
            // overlap; restricting to the first i-1 entries keeps predecessors
            // inside the processed prefix.
            int j = (int)(upper_bound(ends.begin(), ends.begin() + (i - 1), start) - ends.begin());
            // Skip job i (inherit best[i-1]) or take it on top of best[j].
            best[i] = max(best[i - 1], best[j] + p);
        }
        return (int)best[n];
    }
};
