class Solution {
  public:
    string findSpecialNodes(int n, vector<vector<int>> &edges) {
        vector<vector<int>> adj(n);
        for (auto &e : edges) {
            adj[e[0]].push_back(e[1]);
            adj[e[1]].push_back(e[0]);
        }

        // Root at node 0 and sweep once for a BFS order plus parents: children
        // always sit after their parent in the order, and both passes lean on it.
        vector<int> parent(n, -1);
        vector<int> order;
        order.reserve(n);
        order.push_back(0);
        for (int head = 0; head < (int)order.size(); head++) {
            int u = order[head];
            for (int v : adj[u]) {
                if (v != parent[u]) {
                    parent[v] = u;
                    order.push_back(v);
                }
            }
        }

        // Down pass, over the order reversed so each child is final before its
        // parent reads it: down[v] is the height of v's subtree. The top two
        // child chains ride along because the up pass must route around a
        // parent's best arm when the path re-enters through that arm.
        vector<int> down(n, 0);
        vector<int> second(n, 0);
        vector<int> bestChild(n, -1);
        for (int i = (int)order.size() - 1; i >= 0; i--) {
            int v = order[i];
            int p = parent[v];
            if (p >= 0) {
                int chain = down[v] + 1;
                if (chain > down[p]) {
                    second[p] = down[p];
                    down[p] = chain;
                    bestChild[p] = v;
                } else if (chain > second[p]) {
                    second[p] = chain;
                }
            }
        }

        // Up pass, forward over the order: up[v] is the longest path leaving
        // v's subtree through its parent, and max(down[v], up[v]) is v's
        // eccentricity. A sibling arm stands in for the parent's best arm
        // exactly when v owns that arm, which is why second was kept.
        vector<int> up(n, 0);
        int diameter = 0;
        for (int v : order) {
            int p = parent[v];
            if (p >= 0) {
                int arm = v == bestChild[p] ? second[p] : down[p];
                up[v] = max(up[p], arm) + 1;
            }
            diameter = max(diameter, max(down[v], up[v]));
        }

        // A node terminates a diameter exactly when its eccentricity equals
        // the tree's widest path, so compare and print.
        string res(n, '0');
        for (int i = 0; i < n; i++) {
            if (max(down[i], up[i]) == diameter) {
                res[i] = '1';
            }
        }
        return res;
    }
};
