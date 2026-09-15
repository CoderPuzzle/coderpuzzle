class Solution {
    // Knapsack merge of the children's budget profiles: spend t in one child
    // against every budget level b, then a prefix maximum so leftover budget
    // never lowers a value.
    vector<int> combine(const vector<int> &kids, vector<vector<int>> &tables, int budget) {
        vector<int> cur(budget + 1, 0);
        for (int child : kids) {
            const vector<int> &arr = tables[child];
            vector<int> nxt(cur);
            for (int b = 0; b <= budget; b++) {
                int cb = cur[b];
                for (int t = 0; t + b <= budget; t++) {
                    int val = cb + arr[t];
                    if (val > nxt[b + t])
                        nxt[b + t] = val;
                }
            }
            cur = move(nxt);
            for (int b = 1; b <= budget; b++) {
                if (cur[b] < cur[b - 1])
                    cur[b] = cur[b - 1];
            }
        }
        return cur;
    }

  public:
    int maxProfit(int n, vector<int> &present, vector<int> &future, vector<vector<int>> &hierarchy, int budget) {
        vector<vector<int>> children(n);
        for (auto &e : hierarchy) {
            children[e[0] - 1].push_back(e[1] - 1);
        }

        // BFS order lets every node's children finish before the node itself.
        vector<int> order;
        order.reserve(n);
        order.push_back(0);
        for (size_t i = 0; i < order.size(); i++) {
            for (int v : children[order[i]])
                order.push_back(v);
        }

        // f[u][b]: best profit in u's subtree within budget b when u's boss did
        // not buy (u pays the full price); g[u][b]: the boss did buy (u may pay
        // half). The discount depends only on the direct boss, so two profiles
        // are enough.
        vector<vector<int>> f(n), g(n);
        for (int idx = n - 1; idx >= 0; idx--) {
            int u = order[idx];
            vector<int> childF = combine(children[u], f, budget);
            vector<int> childG = combine(children[u], g, budget);

            // If u does not buy, its children get no discount, so both tables
            // start from merged childF. Buying switches to childG (children
            // become discount-eligible) at the full or halved cost respectively.
            vector<int> fu(childF), gu(childF);
            int costFull = present[u];
            int costDisc = present[u] / 2;
            int profitFull = future[u] - costFull;
            int profitDisc = future[u] - costDisc;
            for (int b = 0; b <= budget; b++) {
                if (b >= costFull) {
                    int val = childG[b - costFull] + profitFull;
                    if (val > fu[b])
                        fu[b] = val;
                }
                if (b >= costDisc) {
                    int val = childG[b - costDisc] + profitDisc;
                    if (val > gu[b])
                        gu[b] = val;
                }
            }
            // Re-apply a prefix maximum after folding in u's own purchase.
            for (int b = 1; b <= budget; b++) {
                if (fu[b] < fu[b - 1])
                    fu[b] = fu[b - 1];
                if (gu[b] < gu[b - 1])
                    gu[b] = gu[b - 1];
            }
            f[u] = move(fu);
            g[u] = move(gu);
        }
        // The CEO has no boss and therefore never gets a discount.
        return f[0][budget];
    }
};
