class Solution {
  public:
    int maximalNetworkRank(int n, vector<vector<int>> &roads) {
        vector<int> degree(n, 0);
        set<pair<int, int>> connected;
        for (auto &road : roads) {
            int a = road[0];
            int b = road[1];
            degree[a]++;
            degree[b]++;
            connected.insert({min(a, b), max(a, b)});
        }

        int best = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int rank = degree[i] + degree[j];
                if (connected.count({i, j})) {
                    rank--;
                }
                if (rank > best) {
                    best = rank;
                }
            }
        }
        return best;
    }
};
