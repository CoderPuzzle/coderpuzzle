class Solution {
  public:
    long long maximumScoreAfterOperations(vector<vector<int>> &edges, vector<int> &values) {
        // A tree stays healthy exactly when every root-to-leaf path keeps at
        // least one un-taken node. dp[x] is the best score inside x's subtree
        // while every x-to-leaf path must still keep a node: keep x (its value
        // stays, so every descendant is free to take: the child subtree sums)
        // or take x and let each child subtree solve the same problem (dp of
        // the children). A leaf must keep itself, so its dp is 0. The answer
        // is dp[0]. n reaches 2 * 10^4 on path-shaped trees, so the two walks
        // run on explicit arrays, never on the call stack.
        int n = values.size();
        vector<vector<int>> adj(n);
        for (const auto &e : edges) {
            adj[e[0]].push_back(e[1]);
            adj[e[1]].push_back(e[0]);
        }
        // Iterative BFS from the root: fixes a parent for every node and an
        // order in which every parent precedes its children.
        vector<int> parent(n, -1), order;
        vector<char> hasChild(n, 0);
        order.reserve(n);
        order.push_back(0);
        parent[0] = 0;
        for (int head = 0; head < (int)order.size(); ++head) {
            int x = order[head];
            for (int y : adj[x]) {
                if (parent[y] == -1) {
                    parent[y] = x;
                    hasChild[x] = 1;
                    order.push_back(y);
                }
            }
        }
        // Reverse order visits children before parents; each finished node
        // hands its subtree sum and dp value up to its parent.
        vector<long long> subSum(n, 0), dp(n, 0);
        for (int i = (int)order.size() - 1; i >= 0; --i) {
            int x = order[i];
            long long here = values[x] + subSum[x];
            if (hasChild[x])
                dp[x] = max((long long)values[x] + dp[x], here - values[x]);
            subSum[x] = here;
            if (x != 0) {
                subSum[parent[x]] += here;
                dp[parent[x]] += dp[x];
            }
        }
        return dp[0];
    }
};
