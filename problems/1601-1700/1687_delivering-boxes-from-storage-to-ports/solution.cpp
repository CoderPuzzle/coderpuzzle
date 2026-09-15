class Solution {
  public:
    // Boxes are delivered in order, so every voyage carries a contiguous
    // stretch boxes l+1..i and costs 2 + runs[i] - runs[l+1]: one trip per
    // port change inside the stretch, plus the first port and the return
    // to storage (runs counts port changes before each index). Pulling the
    // i-dependent part out of dp[i]'s window minimum leaves key[l] =
    // dp[l] - runs[l+1], so a monotonic queue of l values keyed by key
    // answers each DP step in constant time while the weight and box
    // limits slide the window forward.
    int boxDelivering(vector<vector<int>> &boxes, int portsCount, int maxBoxes, int maxWeight) {
        int n = boxes.size();
        // running loaded weight reaches 10^5 * 10^5 = 10^10 — 64 bits
        vector<long long> weightPrefix(n + 1);
        vector<int> runs(n + 1);
        for (int i = 0; i < n; ++i) {
            weightPrefix[i + 1] = weightPrefix[i] + boxes[i][1];
            runs[i + 1] = runs[i] + (i > 0 && boxes[i - 1][0] != boxes[i][0]);
        }
        vector<int> dp(n + 1);
        vector<int> key(n);
        deque<int> window; // candidate l values with strictly increasing keys
        int lightest = 0;  // smallest l whose loaded weight still fits maxWeight
        for (int i = 1; i <= n; ++i) {
            int fresh = i - 1;
            key[fresh] = dp[fresh] - runs[i];
            while (!window.empty() && key[window.back()] >= key[fresh]) {
                window.pop_back();
            }
            window.push_back(fresh);
            // weights are positive, so this floor only moves forward
            while (weightPrefix[i] - weightPrefix[lightest] > maxWeight) {
                ++lightest;
            }
            int low = max(lightest, i - maxBoxes);
            while (window.front() < low) {
                window.pop_front();
            }
            dp[i] = 2 + runs[i] + key[window.front()];
        }
        return dp[n];
    }
};
