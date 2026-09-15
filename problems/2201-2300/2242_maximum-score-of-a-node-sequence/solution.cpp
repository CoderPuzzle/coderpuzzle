class Solution {
  public:
    int maximumScore(vector<int> &scores, vector<vector<int>> &edges) {
        int n = (int)scores.size();
        vector<vector<int>> adj(n);
        for (auto &e : edges) {
            adj[e[0]].push_back(e[1]);
            adj[e[1]].push_back(e[0]);
        }

        // keep only the 3 highest-scoring neighbours of each node
        // (stable_sort matches Python's sorted stability on ties)
        vector<vector<int>> top3(n);
        for (int u = 0; u < n; u++) {
            vector<int> nbrs = adj[u];
            stable_sort(nbrs.begin(), nbrs.end(), [&](int x, int y) { return scores[x] > scores[y]; });
            if ((int)nbrs.size() > 3)
                nbrs.resize(3);
            top3[u] = nbrs;
        }

        int best = -1;
        for (auto &e : edges) {
            int a = e[0], b = e[1];
            int base = scores[a] + scores[b];
            for (int x : top3[a]) {
                if (x == b)
                    continue;
                for (int y : top3[b]) {
                    if (y == a || x == y)
                        continue;
                    int total = base + scores[x] + scores[y];
                    if (total > best)
                        best = total;
                }
            }
        }
        return best;
    }
};
