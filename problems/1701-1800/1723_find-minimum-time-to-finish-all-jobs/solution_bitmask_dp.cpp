class Solution {
  public:
    int minimumTimeRequired(vector<int> &jobs, int k) {
        int n = jobs.size();
        int size = 1 << n;
        int full = size - 1;
        // sums[mask]: total length of the job set named by mask, built by
        // peeling off one lowest-numbered job at a time.
        vector<long long> sums(size, 0);
        for (int mask = 1; mask < size; mask++) {
            int low = mask & -mask;
            sums[mask] = sums[mask ^ low] + jobs[__builtin_ctz(low)];
        }
        long long total = sums[full];
        // prev[mask]: lightest maximum load achievable when the job set mask
        // is covered by the workers placed so far. One worker is placed, so
        // every set simply lands on it whole.
        vector<long long> prev = sums;
        for (int worker = 2; worker <= k; worker++) {
            vector<long long> cur(size, 0);
            for (int mask = 1; mask < size; mask++) {
                int low = mask & -mask;
                int rest = mask ^ low;
                // The worker being placed must take the lowest-numbered job
                // still unserved — workers are interchangeable — so only
                // submasks holding that bit are distinct choices.
                long long best = total;
                for (int sub = rest;; sub = (sub - 1) & rest) {
                    // The newcomer carries sub; everything else was already
                    // solved on one fewer worker. The worse side of the pair
                    // is the finished assignment's maximum load.
                    long long carried = prev[rest ^ sub];
                    long long load = sums[sub | low];
                    if (carried < load)
                        carried = load;
                    if (carried < best)
                        best = carried;
                    if (sub == 0)
                        break;
                }
                cur[mask] = best;
            }
            prev = cur;
        }
        return (int)prev[full];
    }
};
