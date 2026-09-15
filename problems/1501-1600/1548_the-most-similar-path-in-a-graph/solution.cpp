class Solution {
  public:
    vector<int> mostSimilar(int n, vector<vector<int>> &roads, vector<string> &names, vector<string> &targetPath) {
        vector<vector<int>> adjacency(n);
        for (auto &road : roads) {
            adjacency[road[0]].push_back(road[1]);
            adjacency[road[1]].push_back(road[0]);
        }

        int pathLength = static_cast<int>(targetPath.size());
        vector<vector<int>> dp(pathLength, vector<int>(n, 0));
        vector<vector<int>> parent(pathLength, vector<int>(n, -1));
        for (int city = 0; city < n; ++city) {
            dp[0][city] = names[city] == targetPath[0] ? 0 : 1;
        }

        for (int i = 1; i < pathLength; ++i) {
            for (int city = 0; city < n; ++city) {
                int bestParent = -1;
                int bestCost = -1;
                for (int neighbor : adjacency[city]) {
                    int candidate = dp[i - 1][neighbor];
                    if (bestParent == -1 || candidate < bestCost) {
                        bestCost = candidate;
                        bestParent = neighbor;
                    }
                }
                int mismatchCost = names[city] == targetPath[i] ? 0 : 1;
                dp[i][city] = bestCost + mismatchCost;
                parent[i][city] = bestParent;
            }
        }

        int endCity = 0;
        for (int city = 1; city < n; ++city) {
            if (dp[pathLength - 1][city] < dp[pathLength - 1][endCity])
                endCity = city;
        }

        vector<int> path(pathLength);
        int city = endCity;
        for (int i = pathLength - 1; i >= 0; --i) {
            path[i] = city;
            city = parent[i][city];
        }
        return path;
    }
};
