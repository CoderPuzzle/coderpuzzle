class Solution {
  public:
    bool isPossible(int n, vector<vector<int>> &edges) {
        // One added edge flips exactly two parities, so at most four
        // odd-degree nodes are repairable. Normalized (min,max) pairs live
        // in a hash set, making every "is this edge slot free" probe O(1).
        unordered_set<long long> seen;
        vector<int> degree(n + 1, 0);
        for (auto &edge : edges) {
            ++degree[edge[0]];
            ++degree[edge[1]];
            long long u = edge[0], v = edge[1];
            seen.insert(u < v ? u * 200001 + v : v * 200001 + u);
        }
        auto linked = [&](int a, int b) {
            long long u = a, v = b;
            return seen.count(u < v ? u * 200001 + v : v * 200001 + u) > 0;
        };
        vector<int> odds;
        for (int node = 1; node <= n; ++node) {
            if (degree[node] & 1)
                odds.push_back(node);
        }
        if (odds.empty())
            return true;
        if (odds.size() > 4)
            return false;
        if (odds.size() == 2) {
            int a = odds[0], b = odds[1];
            if (!linked(a, b))
                return true;
            for (int c = 1; c <= n; ++c) {
                if (c != a && c != b && !linked(a, c) && !linked(b, c)) {
                    return true;
                }
            }
            return false;
        }
        int w = odds[0], x = odds[1], y = odds[2], z = odds[3];
        return (!linked(w, x) && !linked(y, z)) || (!linked(w, y) && !linked(x, z)) || (!linked(w, z) && !linked(x, y));
    }
};
