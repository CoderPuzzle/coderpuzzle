class Solution {
  public:
    int maximizeWin(std::vector<int> &prizePositions, int k) {
        // Sliding windows in each direction build the best single k-window
        // inside every index prefix and suffix; the answer maximizes their
        // sum over all split points. Counts stay <= n <= 10^5, inside int.
        int n = prizePositions.size();
        std::vector<int> pre(n + 1, 0);
        for (int t = 0, s = 0, mx = 0; t < n; ++t) {
            while (prizePositions[t] - prizePositions[s] > k)
                ++s;
            mx = std::max(mx, t - s + 1);
            pre[t + 1] = mx;
        }
        std::vector<int> suf(n + 1, 0);
        for (int e = n - 1, g = n - 1, mx = 0; e >= 0; --e) {
            while (prizePositions[g] - prizePositions[e] > k)
                --g;
            mx = std::max(mx, g - e + 1);
            suf[e] = mx;
        }
        int ans = 0;
        for (int c = 0; c <= n; ++c) {
            ans = std::max(ans, pre[c] + suf[c]);
        }
        return ans;
    }
};
