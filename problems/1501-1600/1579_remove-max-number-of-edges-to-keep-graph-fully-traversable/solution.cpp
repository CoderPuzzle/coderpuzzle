class Solution {
  public:
    int maxNumEdgesToRemove(int n, vector<vector<int>> &edges) {
        // Disjoint-set union with path compression and union-by-size: two
        // independent copies track what Alice and Bob can each reach, but
        // every Type 3 edge is unioned into both copies at once, since it
        // serves both of them for free.
        vector<int> aliceParent(n + 1), bobParent(n + 1);
        iota(aliceParent.begin(), aliceParent.end(), 0);
        iota(bobParent.begin(), bobParent.end(), 0);
        int aliceComponents = n, bobComponents = n;

        auto find = [](vector<int> &parent, int node) {
            while (parent[node] != node) {
                parent[node] = parent[parent[node]];
                node = parent[node];
            }
            return node;
        };
        auto unite = [&](vector<int> &parent, int &components, int a, int b) {
            int rootA = find(parent, a), rootB = find(parent, b);
            if (rootA == rootB)
                return false;
            parent[rootA] = rootB;
            components--;
            return true;
        };

        int used = 0;
        // Type 3 edges go first: whichever ones actually merge two
        // components help both Alice and Bob simultaneously, so they are
        // never worse than spending a Type 1 and a Type 2 edge instead.
        for (auto &edge : edges) {
            if (edge[0] == 3) {
                bool mergedAlice = unite(aliceParent, aliceComponents, edge[1], edge[2]);
                bool mergedBob = unite(bobParent, bobComponents, edge[1], edge[2]);
                if (mergedAlice || mergedBob)
                    used++;
            }
        }

        // Type 1 (Alice-only) and Type 2 (Bob-only) edges fill in whatever
        // the shared edges left disconnected, each within its own copy.
        for (auto &edge : edges) {
            if (edge[0] == 1) {
                if (unite(aliceParent, aliceComponents, edge[1], edge[2]))
                    used++;
            } else if (edge[0] == 2) {
                if (unite(bobParent, bobComponents, edge[1], edge[2]))
                    used++;
            }
        }

        if (aliceComponents != 1 || bobComponents != 1)
            return -1;
        return (int)edges.size() - used;
    }
};
