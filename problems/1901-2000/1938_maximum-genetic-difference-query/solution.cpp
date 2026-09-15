class Solution {
    static const int BITS = 18;

  public:
    vector<int> maxGeneticDifference(vector<int> &parents, vector<vector<int>> &queries) {
        int n = (int)parents.size();
        vector<vector<int>> children(n);
        int root = -1;
        for (int i = 0; i < n; i++) {
            if (parents[i] == -1)
                root = i;
            else
                children[parents[i]].push_back(i);
        }

        vector<vector<pair<int, int>>> byNode(n); // (val, query index)
        for (int idx = 0; idx < (int)queries.size(); idx++) {
            byNode[queries[idx][0]].push_back(make_pair(queries[idx][1], idx));
        }

        vector<int> ans(queries.size(), 0);

        // trie stored as flat arrays: children[bit] indices and subtree counts
        vector<array<int, 2>> nxt;
        vector<int> count;
        auto insert = [&](int x, int delta) {
            int node = 0;
            count[node] += delta;
            for (int b = BITS - 1; b >= 0; b--) {
                int bit = (x >> b) & 1;
                if (nxt[node][bit] == 0) {
                    nxt[node][bit] = (int)nxt.size();
                    nxt.push_back({0, 0});
                    count.push_back(0);
                }
                node = nxt[node][bit];
                count[node] += delta;
            }
        };
        auto queryMax = [&](int x) {
            int node = 0;
            int res = 0;
            for (int b = BITS - 1; b >= 0; b--) {
                int bit = (x >> b) & 1;
                int want = 1 - bit;
                int cand = nxt[node][want];
                if (cand != 0 && count[cand] > 0) {
                    res |= 1 << b;
                    node = cand;
                } else {
                    node = nxt[node][bit];
                }
            }
            return res;
        };

        nxt.push_back({0, 0});
        count.push_back(0);

        // stack of (node, exiting)
        vector<pair<int, int>> stack;
        stack.push_back(make_pair(root, 0));
        while (!stack.empty()) {
            auto [u, exiting] = stack.back();
            stack.pop_back();
            if (exiting) {
                insert(u, -1);
                continue;
            }
            stack.push_back(make_pair(u, 1));
            insert(u, 1);
            for (auto &[val, idx] : byNode[u]) {
                ans[idx] = queryMax(val);
            }
            for (int v : children[u]) {
                stack.push_back(make_pair(v, 0));
            }
        }

        return ans;
    }
};
