class Solution {
    unordered_map<int, int> parent;

  public:
    vector<int> findRedundantConnection(vector<vector<int>> &edges) {
        parent.clear();
        // A tree plus one extra edge has exactly one cycle; the first edge
        // failing the union test is the one that closes it.
        for (const auto &edge : edges) {
            if (!myUnion(edge[0], edge[1])) {
                return edge;
            }
        }
        return {};
    }

  private:
    int find(int node) {
        int root = node;
        while (parent[root] != root) {
            root = parent[root];
        }
        // Second walk repoints every visited node at the root (path
        // compression), flattening the structure for later finds.
        while (parent[node] != root) {
            int next = parent[node];
            parent[node] = root;
            node = next;
        }
        return root;
    }

    bool myUnion(int a, int b) {
        // Unseen nodes register lazily on first touch.
        if (parent.find(a) == parent.end()) {
            parent[a] = a;
        }
        if (parent.find(b) == parent.end()) {
            parent[b] = b;
        }
        int ra = find(a);
        int rb = find(b);
        // Equal roots mean this edge would reconnect one component: the cycle.
        if (ra == rb) {
            return false;
        }
        parent[ra] = rb;
        return true;
    }
};
