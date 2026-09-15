class Solution {
  public:
    int minimumDistance(string word) {
        // dp[o] = cheapest cost of the typed prefix with the resting finger on
        // letter o (o == 26 models the still-unused finger, distance 0).
        const int INF = numeric_limits<int>::max();
        vector<int> dp(27, 0);
        for (int i = 1; i < (int)word.size(); ++i) {
            int prev = word[i - 1] - 'A';
            int cur = word[i] - 'A';
            int step = dist(prev, cur);
            vector<int> nxt(27, INF);
            for (int o = 0; o < 27; ++o) {
                if (dp[o] == INF)
                    continue;
                long long cost = dp[o];
                // Move the finger that just typed; the resting finger stays.
                if (cost + step < nxt[o])
                    nxt[o] = (int)(cost + step);
                // The resting finger types cur; prev becomes the new rest.
                long long move = cost + dist(o, cur);
                if (move < nxt[prev])
                    nxt[prev] = (int)move;
            }
            dp = nxt;
        }
        return *min_element(dp.begin(), dp.end());
    }

  private:
    int dist(int a, int b) {
        if (a == 26 || b == 26)
            return 0;
        return abs(a / 6 - b / 6) + abs(a % 6 - b % 6);
    }
};
