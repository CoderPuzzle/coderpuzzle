class Solution {
  public:
    int maxPerformance(int n, vector<int> &speed, vector<int> &efficiency, int k) {
        const long long MOD = 1000000007LL;
        vector<pair<int, int>> engineers(n);
        for (int i = 0; i < n; i++) {
            engineers[i] = {efficiency[i], speed[i]};
        }
        // Decouple sum(speeds) * min(efficiency) by fixing the minimum:
        // sweep in decreasing efficiency so the current engineer caps the
        // team, and everyone seen so far has efficiency >= theirs.
        sort(engineers.begin(), engineers.end(), greater<pair<int, int>>());
        priority_queue<int, vector<int>, greater<int>> pq;
        long long speedSum = 0;
        long long best = 0;
        for (auto &[eff, spd] : engineers) {
            pq.push(spd);
            speedSum += spd;
            // Evict the slowest when over budget, leaving the k fastest
            // among engineers with efficiency >= the current one.
            if ((int)pq.size() > k) {
                speedSum -= pq.top();
                pq.pop();
            }
            // Best performance of any team this engineer caps; the optimal
            // team's bottleneck appears as "current" at some step.
            long long perf = speedSum * eff;
            best = max(best, perf);
        }
        // Reduce only at the end: the max must be taken on true values.
        return (int)(best % MOD);
    }
};
