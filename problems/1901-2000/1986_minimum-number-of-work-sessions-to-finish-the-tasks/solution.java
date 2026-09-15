class Solution {

    public int minSessions(int[] tasks, int sessionTime) {
        int n = tasks.length;
        int FULL = (1 << n) - 1;
        // dp[mask] = (sessions_used, remaining_time_in_open_session)
        int[] sessions = new int[1 << n];
        int[] remaining = new int[1 << n];
        boolean[] reachable = new boolean[1 << n];
        reachable[0] = true;
        for (int mask = 0; mask < 1 << n; mask++) {
            if (!reachable[mask]) continue;
            for (int i = 0; i < n; i++) {
                int bit = 1 << i;
                if ((mask & bit) != 0) continue;
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
                if (
                    !reachable[next] || candS < sessions[next] || (candS == sessions[next] && candR > remaining[next])
                ) {
                    reachable[next] = true;
                    sessions[next] = candS;
                    remaining[next] = candR;
                }
            }
        }
        return sessions[FULL];
    }
}
