class Solution {
  public:
    int findRotateSteps(string ring, string key) {
        int n = ring.size();
        // Precompute each character's indices so every stage only considers
        // alignments that actually spell the current key character (never
        // empty because the key is guaranteed spellable).
        vector<vector<int>> positions(26);
        for (int i = 0; i < n; i++)
            positions[ring[i] - 'a'].push_back(i);
        // dp: ring index aligned at 12:00 -> min rotation steps so far
        const int INF = numeric_limits<int>::max();
        vector<int> dp(n, INF);
        vector<int> active;
        dp[0] = 0;
        active.push_back(0);
        for (char ch : key) {
            vector<int> ndp(n, INF);
            vector<int> nactive;
            for (int j : positions[ch - 'a']) {
                int best = INF;
                for (int i : active) {
                    // Circular rotation cost between alignments i and j:
                    // the shorter of the direct and wrap-around distances.
                    int diff = abs(i - j);
                    int rot = min(diff, n - diff);
                    best = min(best, dp[i] + rot);
                }
                ndp[j] = best;
                nactive.push_back(j);
            }
            dp = ndp;
            active = nactive;
        }
        // Cheapest final alignment, plus one button press per key char.
        int ans = INF;
        for (int i : active)
            ans = min(ans, dp[i]);
        return ans + (int)key.size();
    }
};
