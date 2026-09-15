class Solution {
  public:
    long long maxScore(vector<vector<int>> &edges) {
        int n = (int)edges.size();
        if (n == 1)
            return 0;
        vector<vector<int>> children(n);
        for (int i = 1; i < n; i++) {
            children[edges[i][0]].push_back(i);
        }
        // Iterative preorder; iterating it in reverse finalizes every child
        // before its parent, so no recursion (n can be 1e5, deep chains).
        vector<int> order;
        order.reserve(n);
        vector<int> stack;
        stack.push_back(0);
        while (!stack.empty()) {
            int u = stack.back();
            stack.pop_back();
            order.push_back(u);
            for (int c : children[u])
                stack.push_back(c);
        }
        // dp0[u]: parent edge not chosen; dp1[u]: chosen (its weight is
        // accounted by the parent, so dp1 only constrains u's own picks).
        vector<long long> dp0(n, 0), dp1(n, 0);
        for (int oi = (int)order.size() - 1; oi >= 0; oi--) {
            int u = order[oi];
            // base = take no child edge: sum of children in state 0.
            long long base = 0, bestGain = 0;
            for (int c : children[u]) {
                long long w = edges[c][1];
                base += dp0[c];
                // Switching c's edge on: child must drop its parent edge.
                long long gain = dp1[c] + w - dp0[c];
                if (gain > bestGain)
                    bestGain = gain;
            }
            // u may take at most one child edge; only a positive gain is
            // applied, so negative-weight edges are never forced in.
            dp0[u] = base + bestGain;
            // Parent edge taken => no child edge allowed for u.
            dp1[u] = base;
        }
        return dp0[0];
    }
};
