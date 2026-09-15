class Solution {
  public:
    int assignEdgeWeights(vector<vector<int>> &edges) {
        // A weight of 2 never changes parity, so only the number of 1s on
        // the path to a deepest node matters: any odd-size subset of the
        // d = max depth edges gives an odd cost, and there are 2^(d-1) of
        // those. An iterative DFS finds d (the tree can be a long chain).
        const long long mod = 1e9 + 7;
        int n = edges.size() + 1;
        vector<vector<int>> adj(n + 1);
        for (auto &e : edges) {
            adj[e[0]].push_back(e[1]);
            adj[e[1]].push_back(e[0]);
        }
        vector<int> depth(n + 1, -1);
        vector<int> stack;
        stack.push_back(1);
        depth[1] = 0;
        int maxDepth = 0;
        while (!stack.empty()) {
            int u = stack.back();
            stack.pop_back();
            for (int v : adj[u])
                if (depth[v] < 0) {
                    depth[v] = depth[u] + 1;
                    maxDepth = max(maxDepth, depth[v]);
                    stack.push_back(v);
                }
        }
        long long ways = 1;
        for (int i = 0; i < maxDepth - 1; i++)
            ways = ways * 2 % mod;
        return (int)ways;
    }
};
