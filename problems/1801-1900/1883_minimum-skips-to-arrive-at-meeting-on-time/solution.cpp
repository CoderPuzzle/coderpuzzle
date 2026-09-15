class Solution {
  public:
    // dp[j] = smallest accumulated time (in distance units) after the
    // current road with j skips used; rests already rounded. Rest:
    // ceil((t+d)/speed)*speed at same j; skip: t+d at j+1.
    int minSkips(vector<int> &dist, int speed, int hoursBefore) {
        int n = dist.size();
        const long long INF = LLONG_MAX / 4;
        vector<long long> dp(n + 1, INF);
        dp[0] = 0;
        for (int i = 0; i < n; i++) {
            long long d = dist[i];
            vector<long long> ndp(n + 1, INF);
            if (i == n - 1) {
                for (int j = 0; j <= n; j++) {
                    if (dp[j] < INF && dp[j] + d < ndp[j])
                        ndp[j] = dp[j] + d;
                }
            } else {
                for (int j = 0; j < n; j++) {
                    long long t = dp[j];
                    if (t >= INF)
                        continue;
                    long long arr = t + d;
                    if (arr < ndp[j + 1])
                        ndp[j + 1] = arr;
                    long long rested = (arr + speed - 1) / speed * speed;
                    if (rested < ndp[j])
                        ndp[j] = rested;
                }
            }
            dp = ndp;
        }
        for (int j = 0; j <= n; j++) {
            if (dp[j] < INF && dp[j] <= (long long)hoursBefore * speed)
                return j;
        }
        return -1;
    }
};
