class Solution {
  public:
    vector<int> sortItems(int n, int m, vector<int> &group, vector<vector<int>> &beforeItems) {
        vector<int> grp(group);
        int total = m;
        for (int i = 0; i < n; i++) {
            if (grp[i] == -1)
                grp[i] = total++;
        }

        vector<vector<int>> itemAdj(n);
        vector<vector<int>> groupAdj(total);
        vector<int> groupIndeg(total, 0);
        for (int i = 0; i < n; i++) {
            for (int b : beforeItems[i]) {
                itemAdj[b].push_back(i);
                int gb = grp[b], gi = grp[i];
                if (gb != gi) {
                    groupAdj[gb].push_back(gi);
                    groupIndeg[gi]++;
                }
            }
        }

        // LIFO Kahn: stack initialized in descending id order so the smallest
        // zero-indegree id pops first; newly available nodes are pushed on top.
        auto kahn = [](const vector<int> &keys, const vector<vector<int>> &adj, vector<int> indeg) -> vector<int> {
            vector<int> available;
            for (int k : keys) {
                if (indeg[k] == 0)
                    available.push_back(k);
            }
            sort(available.begin(), available.end(), greater<int>());
            vector<int> order;
            while (!available.empty()) {
                int u = available.back();
                available.pop_back();
                order.push_back(u);
                for (int v : adj[u]) {
                    if (--indeg[v] == 0)
                        available.push_back(v);
                }
            }
            if ((int)order.size() != (int)keys.size())
                return {};
            return order;
        };

        vector<int> keys(total);
        for (int i = 0; i < total; i++)
            keys[i] = i;
        vector<int> groupOrder = kahn(keys, groupAdj, groupIndeg);
        if (groupOrder.empty()) {
            if (total > 0)
                return {};
        }

        vector<vector<int>> itemsInGroup(total);
        for (int i = 0; i < n; i++)
            itemsInGroup[grp[i]].push_back(i);

        vector<int> result;
        vector<int> indeg2(n, 0);
        vector<vector<int>> adj2(n);
        for (int g : groupOrder) {
            vector<int> &nodes = itemsInGroup[g];
            if (nodes.empty())
                continue;
            for (int u : nodes) {
                indeg2[u] = 0;
                adj2[u].clear();
            }
            for (int u : nodes) {
                for (int v : itemAdj[u]) {
                    if (grp[v] == g) {
                        adj2[u].push_back(v);
                        indeg2[v]++;
                    }
                }
            }
            vector<int> order = kahn(nodes, adj2, indeg2);
            if ((int)order.size() != (int)nodes.size())
                return {};
            for (int x : order)
                result.push_back(x);
        }
        return result;
    }
};
