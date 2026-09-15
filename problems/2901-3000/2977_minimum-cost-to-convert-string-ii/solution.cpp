class Solution {
  public:
    long long minimumCost(string source, string target, vector<string> &original, vector<string> &changed,
                          vector<int> &cost) {
        // Give every distinct conversion string an id and run Floyd-Warshall
        // on the minimum operation cost between any two of them; repeated
        // operations on one window then collapse to a shortest path.
        unordered_map<string, int> ids;
        for (auto &s : original)
            ids.emplace(s, (int)ids.size());
        for (auto &s : changed)
            ids.emplace(s, (int)ids.size());
        int m = (int)ids.size();
        const long long inf = 1LL << 50;
        vector<vector<long long>> dist(m, vector<long long>(m, inf));
        for (int i = 0; i < m; i++)
            dist[i][i] = 0;
        for (int i = 0; i < (int)cost.size(); i++) {
            int x = ids[original[i]];
            int y = ids[changed[i]];
            dist[x][y] = min(dist[x][y], (long long)cost[i]);
        }
        for (int k = 0; k < m; k++)
            for (int i = 0; i < m; i++) {
                if (dist[i][k] >= inf)
                    continue;
                for (int j = 0; j < m; j++)
                    dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);
            }

        // A trie over the distinct strings lets one lockstep walk over
        // source/target from each position find every usable segment length.
        vector<array<int, 26>> trie(1);
        trie[0].fill(-1);
        vector<int> idAt(1, -1);
        for (auto &[s, id] : ids) {
            int cur = 0;
            for (char ch : s) {
                int b = ch - 'a';
                if (trie[cur][b] < 0) {
                    trie[cur][b] = (int)trie.size();
                    trie.push_back({});
                    trie.back().fill(-1);
                    idAt.push_back(-1);
                }
                cur = trie[cur][b];
            }
            idAt[cur] = id;
        }

        int n = (int)source.size();
        vector<long long> dp(n + 1, inf);
        dp[0] = 0;
        for (int j = 0; j < n; j++) {
            if (dp[j] >= inf)
                continue;
            if (source[j] == target[j] && dp[j] < dp[j + 1])
                dp[j + 1] = dp[j];
            int sn = 0, tn = 0;
            for (int k = j; k < n; k++) {
                sn = trie[sn][source[k] - 'a'];
                tn = trie[tn][target[k] - 'a'];
                if (sn < 0 || tn < 0)
                    break;
                int x = idAt[sn], y = idAt[tn];
                if (x >= 0 && y >= 0 && dist[x][y] < inf && dp[j] + dist[x][y] < dp[k + 1])
                    dp[k + 1] = dp[j] + dist[x][y];
            }
        }
        return dp[n] >= inf ? -1 : dp[n];
    }
};
