class Solution {
  public:
    int minimumTime(vector<int> &jobs, vector<int> &workers) {
        // Pair the k-th smallest job with the k-th smallest worker. Exchange
        // argument: ceil(j / w) never decreases when j grows and never grows
        // when w does, so if a smaller job held the larger of two capacities
        // while a larger job held the smaller one, swapping them leaves both
        // pairs' day counts no higher and every other pair untouched. Each
        // swap removes an inversion between the sorted orders, so uncrossing
        // ends at this rank-by-rank pairing — its maximum is the optimum.
        sort(jobs.begin(), jobs.end());
        sort(workers.begin(), workers.end());
        int best = 0;
        for (size_t i = 0; i < jobs.size(); ++i) {
            best = max(best, (jobs[i] + workers[i] - 1) / workers[i]);
        }
        return best;
    }
};
