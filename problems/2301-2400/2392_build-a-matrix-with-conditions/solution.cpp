class Solution {
  public:
    vector<vector<int>> buildMatrix(int k, vector<vector<int>> &rowConditions, vector<vector<int>> &colConditions) {
        vector<int> rowOrder;
        if (!topo(k, rowConditions, rowOrder)) {
            return {};
        }
        vector<int> colOrder;
        if (!topo(k, colConditions, colOrder)) {
            return {};
        }
        // The two orders are independent; distinct vertices of a topo order
        // get distinct positions, so every required pair stays strictly
        // ordered when v is placed at (rowPos[v], colPos[v]).
        vector<int> rowPos(k + 1), colPos(k + 1);
        for (int i = 0; i < k; i++) {
            rowPos[rowOrder[i]] = i;
            colPos[colOrder[i]] = i;
        }
        vector<vector<int>> matrix(k, vector<int>(k, 0));
        for (int v = 1; v <= k; v++) {
            matrix[rowPos[v]][colPos[v]] = v;
        }
        return matrix;
    }

  private:
    // Kahn's algorithm over the condition graph. Duplicate conditions only
    // add parallel edges and matching indegrees — harmless.
    bool topo(int k, vector<vector<int>> &conditions, vector<int> &order) {
        vector<vector<int>> adj(k + 1);
        vector<int> indeg(k + 1, 0);
        for (auto &c : conditions) {
            adj[c[0]].push_back(c[1]);
            indeg[c[1]]++;
        }
        deque<int> queue;
        for (int v = 1; v <= k; v++) {
            if (indeg[v] == 0) {
                queue.push_back(v);
            }
        }
        while (!queue.empty()) {
            int u = queue.front();
            queue.pop_front();
            order.push_back(u);
            for (int w : adj[u]) {
                if (--indeg[w] == 0) {
                    queue.push_back(w);
                }
            }
        }
        // Fewer than k vertices peeled means a cycle: no valid order.
        return (int)order.size() == k;
    }
};
