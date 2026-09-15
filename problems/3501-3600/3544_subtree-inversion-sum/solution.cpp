class Solution {
  public:
    long long subtreeInversionSum(vector<vector<int>> &edges, vector<int> &nums, int k) {
        int n = nums.size();
        vector<vector<int>> adj(n);
        for (auto &e : edges) {
            adj[e[0]].push_back(e[1]);
            adj[e[1]].push_back(e[0]);
        }

        // BFS from the root records each parent and an order whose reversal
        // lists children before parents, so the DP below needs no recursion.
        vector<int> parent(n, -1);
        parent[0] = -2;
        vector<int> order;
        order.reserve(n);
        order.push_back(0);
        for (size_t i = 0; i < order.size(); i++) {
            int u = order[i];
            for (int v : adj[u]) {
                if (v != parent[u]) {
                    parent[v] = u;
                    order.push_back(v);
                }
            }
        }

        // dp[u][d][flip]: best subtree sum of u given the parity of sign flips
        // applied from ancestors and the edge distance d to the nearest inverted
        // ancestor, capped at k since any larger distance behaves identically.
        int width = k + 1;
        vector<array<long long, 2>> rows;
        vector<vector<array<long long, 2>>> dp(n);
        for (int idx = n - 1; idx >= 0; idx--) {
            int u = order[idx];
            // Children are already computed; pool their tables per (flip, distance).
            vector<array<long long, 2>> childSum(width, {0, 0});
            for (int v : adj[u]) {
                if (v == parent[u])
                    continue;
                for (int flip = 0; flip < 2; flip++) {
                    for (int d = 0; d < width; d++) {
                        childSum[d][flip] += dp[v][d][flip];
                    }
                }
            }

            // Not inverting: children observe distance+1 (capped at k). Once the
            // distance is >= k, inverting u is legal too: it flips the parity and
            // resets the child distance to 1; keep the better of the two options.
            rows.assign(width, {0, 0});
            for (int flip = 0; flip < 2; flip++) {
                long long s = flip ? -1 : 1;
                long long baseDont = (long long)nums[u] * s;
                long long baseInv = -(long long)nums[u] * s;
                for (int dist = 0; dist < width; dist++) {
                    int dd = dist < k ? dist + 1 : k;
                    long long valDont = baseDont + childSum[dd][flip];
                    if (dist >= k) {
                        long long valInv = baseInv + childSum[1][flip ^ 1];
                        rows[dist][flip] = max(valDont, valInv);
                    } else {
                        rows[dist][flip] = valDont;
                    }
                }
            }
            dp[u] = rows;
        }
        // The root has no recent inversion above it, so it is free to invert.
        return dp[0][k][0];
    }
};
