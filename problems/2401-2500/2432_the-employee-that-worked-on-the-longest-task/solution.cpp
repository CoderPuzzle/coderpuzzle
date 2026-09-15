class Solution {
  public:
    int hardestWorker(int n, vector<vector<int>> &logs) {
        // The ith task runs from the previous leave time to logs[i][1] (task
        // 0 starts at 0). Keep the best (longest, then smallest id) running.
        int bestId = -1;
        int bestTime = -1;
        int prev = 0;
        for (const auto &log : logs) {
            int duration = log[1] - prev;
            if (duration > bestTime || (duration == bestTime && log[0] < bestId)) {
                bestTime = duration;
                bestId = log[0];
            }
            prev = log[1];
        }
        return bestId;
    }
};
