class Solution {
  public:
    bool validTree(int n, vector<vector<int>> &edges) {
        // A tree needs exactly n - 1 edges: fewer cannot connect n nodes,
        // more cannot stay acyclic — any other count fails immediately.
        if ((int)edges.size() != n - 1) {
            return false;
        }
        vector<vector<int>> adjacency(n);
        for (auto &e : edges) {
            adjacency[e[0]].push_back(e[1]);
            adjacency[e[1]].push_back(e[0]);
        }
        // With n - 1 edges on the table, connectivity is the only open
        // question: connected + n - 1 edges forces the graph to be a tree.
        vector<bool> seen(n, false);
        vector<int> queue;
        queue.push_back(0);
        seen[0] = true;
        int visited = 1;
        for (size_t head = 0; head < queue.size(); head++) {
            int u = queue[head];
            for (int v : adjacency[u]) {
                if (!seen[v]) {
                    seen[v] = true;
                    visited++;
                    queue.push_back(v);
                }
            }
        }
        return visited == n;
    }
};
