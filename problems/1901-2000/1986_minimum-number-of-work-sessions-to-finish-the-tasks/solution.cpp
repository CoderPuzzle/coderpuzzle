class Solution {
  public:
    int minSessions(vector<int> &tasks, int sessionTime) {
        int n = tasks.size();
        int FULL = (1 << n) - 1;
        const int INF = INT_MAX;
        // dp[mask] = (sessions_used, remaining_time_in_open_session)
        vector<int> sessions(1 << n, INF);
        vector<int> remaining(1 << n, 0);
        sessions[0] = 0;
        for (int mask = 0; mask < (1 << n); mask++) {
            if (sessions[mask] == INF)
                continue;
            for (int i = 0; i < n; i++) {
                int bit = 1 << i;
                if (mask & bit)
                    continue;
                int cost = tasks[i];
                int candS, candR;
                if (remaining[mask] >= cost) {
                    candS = sessions[mask];
                    candR = remaining[mask] - cost;
                } else {
                    candS = sessions[mask] + 1;
                    candR = sessionTime - cost;
                }
                int next = mask | bit;
                // fewer sessions wins; tie -> more remaining time wins
                if (candS < sessions[next] || (candS == sessions[next] && candR > remaining[next])) {
                    sessions[next] = candS;
                    remaining[next] = candR;
                }
            }
        }
        return sessions[FULL];
    }
};
