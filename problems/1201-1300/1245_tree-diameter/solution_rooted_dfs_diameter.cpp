class Solution {
  public:
    int treeDiameter(vector<vector<int>> &edges) {
        // No edges: a single-node tree, diameter 0.
        if (edges.empty())
            return 0;
        int n = edges.size() + 1;
        vector<vector<int>> adj(n);
        for (auto &e : edges) {
            adj[e[0]].push_back(e[1]);
            adj[e[1]].push_back(e[0]);
        }

        // Iterative DFS from root 0 with an explicit stack. Each node is
        // recorded as it is popped, and entered only from the neighbor it
        // came from, so `order` meets parents before children.
        vector<int> parent(n, -1);
        vector<int> order;
        order.reserve(n);
        vector<int> stack;
        stack.reserve(n);
        stack.push_back(0);
        while (!stack.empty()) {
            int u = stack.back();
            stack.pop_back();
            order.push_back(u);
            for (int v : adj[u]) {
                if (v != parent[u]) {
                    parent[v] = u;
                    stack.push_back(v);
                }
            }
        }

        // Reversed, `order` is a bottom-up order: children settle before
        // parents. At each node the two deepest child heights combine:
        // their sum is the widest path turning there, the deeper one
        // alone is the node's own height for its parent.
        vector<int> height(n, 0);
        int diameter = 0;
        for (int i = n - 1; i >= 0; i--) {
            int u = order[i];
            int first = 0;
            int second = 0;
            for (int v : adj[u]) {
                if (v != parent[u]) {
                    int child = height[v] + 1;
                    if (child > first) {
                        second = first;
                        first = child;
                    } else if (child > second) {
                        second = child;
                    }
                }
            }
            height[u] = first;
            if (first + second > diameter)
                diameter = first + second;
        }
        return diameter;
    }
};
