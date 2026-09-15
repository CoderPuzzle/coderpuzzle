class Solution {
  public:
    int minimumDiameterAfterMerge(vector<vector<int>> &edges1, vector<vector<int>> &edges2) {
        // Whatever the attachment pair, the merged diameter is the max of
        // three candidates: each original diameter, and the path that
        // crosses the new edge -- deepest leg of tree 1 from its
        // attachment node, plus deepest leg of tree 2, plus 1. Only the
        // third term depends on the choice, and the minimum over
        // attachment nodes of the deepest leg is the radius
        // ceil(d / 2). So connect the two centers: answer =
        // max(d1, d2, ceil(d1/2) + ceil(d2/2) + 1). Each diameter comes
        // from two strictly iterative BFS sweeps (vector-backed queues
        // with a read head); with 1e5 nodes recursion is not an option.
        int d1 = diameter(edges1);
        int d2 = diameter(edges2);
        int cross = (d1 + 1) / 2 + (d2 + 1) / 2 + 1;
        return max(d1, max(d2, cross));
    }

  private:
    struct Sweep {
        int far;
        int best;
    };

    Sweep sweep(const vector<vector<int>> &adj, int src) const {
        int n = static_cast<int>(adj.size());
        vector<int> dist(n, -1);
        dist[src] = 0;
        vector<int> queue;
        queue.reserve(n);
        queue.push_back(src);
        int head = 0;
        int far = src, best = 0;
        while (head < static_cast<int>(queue.size())) {
            int u = queue[head++];
            for (int v : adj[u]) {
                if (dist[v] < 0) {
                    dist[v] = dist[u] + 1;
                    if (dist[v] > best) {
                        far = v;
                        best = dist[v];
                    }
                    queue.push_back(v);
                }
            }
        }
        return {far, best};
    }

    int diameter(const vector<vector<int>> &edges) const {
        int n = static_cast<int>(edges.size()) + 1;
        vector<vector<int>> adj(n);
        for (const auto &e : edges) {
            adj[e[0]].push_back(e[1]);
            adj[e[1]].push_back(e[0]);
        }
        return sweep(adj, sweep(adj, 0).far).best;
    }
};
