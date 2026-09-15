class Solution {
  public:
    vector<int> getCoprimes(vector<int> &nums, vector<vector<int>> &edges) {
        // Values only reach 50, so track ancestors per value: on the current
        // root path, stacks[v] holds the nodes carrying value v, deepest
        // last. A node's answer is the deepest stack top among the values
        // coprime with its own.
        int n = (int)nums.size();
        vector<vector<int>> adj(n);
        for (auto &edge : edges) {
            adj[edge[0]].push_back(edge[1]);
            adj[edge[1]].push_back(edge[0]);
        }
        vector<vector<int>> coprimes(51);
        for (int v = 1; v <= 50; v++) {
            for (int w = 1; w <= 50; w++) {
                if (gcd(v, w) == 1) {
                    coprimes[v].push_back(w);
                }
            }
        }

        vector<int> ans(n, -1), depth(n, 0);
        vector<vector<int>> stacks(51);
        // The tree can be one 1e5-deep chain, so the traversal is
        // iterative: enter frames answer a node against the current stacks
        // and push it onto its value's stack, exit frames pop it again. An
        // exit frame stores the bitwise complement of its node.
        vector<pair<int, int>> stack;
        stack.push_back({0, -1});
        while (!stack.empty()) {
            auto [node, parent] = stack.back();
            stack.pop_back();
            if (node < 0) {
                stacks[nums[~node]].pop_back();
                continue;
            }
            int best = -1, bestDepth = -1;
            for (int w : coprimes[nums[node]]) {
                auto &candidates = stacks[w];
                if (!candidates.empty()) {
                    int top = candidates.back();
                    if (depth[top] > bestDepth) {
                        best = top;
                        bestDepth = depth[top];
                    }
                }
            }
            ans[node] = best;
            stacks[nums[node]].push_back(node);
            stack.push_back({~node, -1});
            for (int y : adj[node]) {
                if (y != parent) {
                    depth[y] = depth[node] + 1;
                    stack.push_back({y, node});
                }
            }
        }
        return ans;
    }
};
