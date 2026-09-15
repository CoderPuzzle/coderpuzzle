class Solution {
  public:
    bool possibleBipartition(int n, vector<vector<int>> &dislikes) {
        // Dislike is symmetric, so build an undirected adjacency list: the
        // unions below need, for every person, everyone that person avoids.
        vector<vector<int>> adjacency(n + 1);
        for (auto &d : dislikes) {
            adjacency[d[0]].push_back(d[1]);
            adjacency[d[1]].push_back(d[0]);
        }

        vector<int> parent(n + 1);
        for (int i = 0; i <= n; i++) {
            parent[i] = i;
        }

        // Everyone a person dislikes must land in one set (the opposite
        // group), so union them all onto that person's first enemy.
        for (int person = 1; person <= n; person++) {
            for (int i = 1; i < (int)adjacency[person].size(); i++) {
                int ra = find(parent, adjacency[person][0]);
                int rb = find(parent, adjacency[person][i]);
                if (ra != rb) {
                    parent[ra] = rb;
                }
            }
        }

        // The split works exactly when no dislike pair ended up merged.
        for (auto &d : dislikes) {
            if (find(parent, d[0]) == find(parent, d[1])) {
                return false;
            }
        }
        return true;
    }

    // Path-halving: splice every other node directly under its
    // grandparent, flattening the tree while walking to the root.
    int find(vector<int> &parent, int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }
};
