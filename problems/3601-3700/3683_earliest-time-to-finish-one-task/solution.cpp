class Solution {
  public:
    int earliestTime(vector<vector<int>> &tasks) {
        // Tasks never interact: [s, t] finishes at s + t, so the earliest
        // completion is just the smallest such sum.
        int best = tasks[0][0] + tasks[0][1];
        for (const auto &task : tasks) {
            best = min(best, task[0] + task[1]);
        }
        return best;
    }
};
