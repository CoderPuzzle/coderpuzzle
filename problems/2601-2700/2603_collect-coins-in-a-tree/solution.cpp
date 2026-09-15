class Solution {
  public:
    int collectTheCoins(vector<int> &coins, vector<vector<int>> &edges) {
        int n = (int)coins.size();
        vector<unordered_set<int>> adj(n);
        for (auto &e : edges) {
            adj[e[0]].insert(e[1]);
            adj[e[1]].insert(e[0]);
        }

        // Phase 1: repeatedly remove leaves that carry no coin.
        vector<int> leaves;
        for (int i = 0; i < n; i++) {
            if (adj[i].size() == 1 && coins[i] == 0)
                leaves.push_back(i);
        }
        while (!leaves.empty()) {
            vector<int> nxt;
            for (int u : leaves) {
                if (!adj[u].empty()) {
                    int v = *adj[u].begin();
                    adj[v].erase(u);
                    if (adj[v].size() == 1 && coins[v] == 0)
                        nxt.push_back(v);
                }
                adj[u].clear();
            }
            leaves = move(nxt);
        }

        // Phase 2: drop two more layers of leaves (distance-2 collection).
        for (int round = 0; round < 2; round++) {
            leaves.clear();
            for (int i = 0; i < n; i++) {
                if (adj[i].size() == 1)
                    leaves.push_back(i);
            }
            for (int u : leaves) {
                if (!adj[u].empty()) {
                    int v = *adj[u].begin();
                    adj[v].erase(u);
                }
                adj[u].clear();
            }
        }

        int remaining = 0;
        for (int i = 0; i < n; i++) {
            if (!adj[i].empty())
                remaining++;
        }
        return max(0, (remaining - 1) * 2);
    }
};
