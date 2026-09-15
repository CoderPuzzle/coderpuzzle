class Solution {
  public:
    int mostProfitablePath(vector<vector<int>> &edges, int bob, vector<int> &amount) {
        int n = amount.size();
        vector<vector<int>> adj(n);
        for (auto &e : edges) {
            adj[e[0]].push_back(e[1]);
            adj[e[1]].push_back(e[0]);
        }

        // One BFS from the root orients the tree: depth[u] is Alice's
        // arrival time, and order lists every node after its parent.
        vector<int> parent(n, -1), depth(n, 0), order;
        vector<bool> seen(n, false);
        seen[0] = true;
        deque<int> queue;
        queue.push_back(0);
        while (!queue.empty()) {
            int u = queue.front();
            queue.pop_front();
            order.push_back(u);
            for (int v : adj[u]) {
                if (!seen[v]) {
                    seen[v] = true;
                    parent[v] = u;
                    depth[v] = depth[u] + 1;
                    queue.push_back(v);
                }
            }
        }

        // Bob has no choices: walk his unique path to the root,
        // recording his arrival time at each node along it.
        unordered_map<int, int> bobTime;
        int t = 0;
        int node = bob;
        while (node != -1) {
            bobTime[node] = t;
            t++;
            node = parent[node];
        }

        // BFS order makes income[parent] final before u, so each
        // root-to-node path sum builds in one sweep. gain compares
        // arrivals: Bob later or absent -> full amount; simultaneous ->
        // half (exact: amounts are even); Bob earlier -> gate open, 0.
        vector<int> income(n, 0);
        bool hasBest = false;
        int best = 0;
        for (int u : order) {
            int d = depth[u];
            auto it = bobTime.find(u);
            int gain;
            if (it == bobTime.end() || it->second > d) {
                gain = amount[u];
            } else if (it->second == d) {
                gain = amount[u] >= 0 ? amount[u] / 2 : -((-amount[u] + 1) / 2);
            } else {
                gain = 0;
            }
            income[u] = (u != 0 ? income[parent[u]] : 0) + gain;
            // Alice must keep moving, so she stops at a leaf: a
            // non-root node with exactly one neighbor.
            if (u != 0 && adj[u].size() == 1) {
                if (!hasBest || income[u] > best) {
                    best = income[u];
                    hasBest = true;
                }
            }
        }
        return best;
    }
};
