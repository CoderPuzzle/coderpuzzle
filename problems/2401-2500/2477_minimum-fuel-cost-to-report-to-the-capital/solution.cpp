class Solution {
  public:
    int minimumFuelCost(vector<vector<int>> &roads, int seats) {
        int n = roads.size() + 1;
        if (n == 1)
            return 0;
        vector<vector<int>> adj(n);
        for (auto &r : roads) {
            adj[r[0]].push_back(r[1]);
            adj[r[1]].push_back(r[0]);
        }

        vector<int> parent(n, -1), order;
        order.reserve(n);
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
                    queue.push_back(v);
                }
            }
        }

        vector<long long> size(n, 1);
        long long fuel = 0;
        for (int i = (int)order.size() - 1; i >= 0; i--) { // children before parents
            int u = order[i];
            if (u == 0)
                continue;
            size[parent[u]] += size[u];
            fuel += (size[u] + seats - 1) / seats;
        }
        return (int)fuel;
    }
};
