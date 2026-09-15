class Solution {
  public:
    vector<int> findMinHeightTrees(int n, vector<vector<int>> &edges) {
        // A one- or two-node tree is its own center; the general loop would
        // also mishandle two nodes that are each other's leaves.
        if (n <= 2) {
            vector<int> r(n);
            iota(r.begin(), r.end(), 0);
            return r;
        }
        vector<vector<int>> adjacency(n);
        vector<int> degree(n, 0);
        for (auto &e : edges) {
            int a = e[0], b = e[1];
            adjacency[a].push_back(b);
            adjacency[b].push_back(a);
            degree[a]++;
            degree[b]++;
        }
        // Peel the tree from the outside in, topological-sort style: delete
        // all current leaves at once, each layer shortening every longest
        // root-to-leaf distance of the remaining core.
        deque<int> leaves;
        for (int i = 0; i < n; i++)
            if (degree[i] == 1)
                leaves.push_back(i);
        int remaining = n;
        // The MHT root is the middle of the diameter path: one node when the
        // diameter has an even edge count, two adjacent middles when odd.
        while (remaining > 2) {
            // k snapshots the layer at round start, so leaves enqueued
            // during the round wait for the next round.
            for (int k = (int)leaves.size(); k > 0; k--) {
                int leaf = leaves.front();
                leaves.pop_front();
                remaining--;
                // The popped leaf's own degree is never zeroed; a popped
                // node is not examined again, so it is harmless.
                for (int neighbor : adjacency[leaf]) {
                    degree[neighbor]--;
                    if (degree[neighbor] == 1)
                        leaves.push_back(neighbor);
                }
            }
        }
        // The one or two survivors are the centroids (MHT roots).
        vector<int> result(leaves.begin(), leaves.end());
        sort(result.begin(), result.end());
        return result;
    }
};
