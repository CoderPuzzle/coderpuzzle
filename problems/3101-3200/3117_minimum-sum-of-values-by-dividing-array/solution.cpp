#include <vector>

class Solution {
  public:
    int minimumValueSum(vector<int> &nums, vector<int> &andValues) {
        // Layered DP: g[k] after j rounds = min value sum splitting nums[:k]
        // into exactly j segments matching andValues[:j]. For a fixed right
        // end r the starts l with AND(nums[l..r]) == t form ONE contiguous
        // run inside the classic AND-group list (extending r folds every
        // stored value with nums[r]; equal results merge into one range),
        // so a transition is a range-minimum over the previous layer,
        // served by a small iterative segment tree. Costs stay below
        // m * max(nums) < 10^6, well inside an int.
        int n = nums.size();
        const int INFTY = 1 << 30;
        vector<vector<pair<int, int>>> groups(n); // (val, smallest start)
        vector<pair<int, int>> vals;
        for (int r = 0; r < n; ++r) {
            int x = nums[r];
            vector<pair<int, int>> nvals;
            nvals.reserve(vals.size() + 1);
            nvals.push_back({x, r});
            for (auto &[v, st] : vals) {
                int nv = v & x;
                if (!nvals.empty() && nv == nvals.back().first) {
                    nvals.back().second = st; // merge range anchored further left
                } else {
                    nvals.push_back({nv, st});
                }
            }
            vals = move(nvals);
            groups[r] = vals;
        }

        vector<int> prev(n + 1, INFTY);
        prev[0] = 0;
        int size = n + 1;
        for (int target : andValues) {
            vector<int> tree(2 * size, INFTY);
            for (int k = 0; k < size; ++k)
                tree[size + k] = prev[k];
            for (int k = size - 1; k > 0; --k)
                tree[k] = min(tree[2 * k], tree[2 * k + 1]);

            vector<int> cur(n + 1, INFTY);
            for (int r = 0; r < n; ++r) {
                int lo = -1, hi = -2;
                const auto &g = groups[r];
                for (int gi = 0; gi < (int)g.size(); ++gi) {
                    if (g[gi].first == target) {
                        lo = g[gi].second;
                        hi = gi > 0 ? g[gi - 1].second - 1 : r;
                        break;
                    }
                }
                if (lo < 0)
                    continue; // this target cannot end at r
                int best = INFTY;
                for (int l = lo + size, rr = hi + 1 + size; l < rr; l >>= 1, rr >>= 1) {
                    if (l & 1)
                        best = min(best, tree[l++]);
                    if (rr & 1)
                        best = min(best, tree[--rr]);
                }
                if (best < INFTY)
                    cur[r + 1] = best + nums[r];
            }
            prev = move(cur);
        }

        return prev[n] < INFTY ? prev[n] : -1;
    }
};
