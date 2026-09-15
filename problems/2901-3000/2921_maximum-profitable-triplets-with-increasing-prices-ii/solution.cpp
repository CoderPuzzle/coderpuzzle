class Solution {
  public:
    int maxProfit(vector<int> &prices, vector<int> &profits) {
        // Fix the middle item j. Two Fenwick (binary indexed) trees over the
        // compressed price ranks answer, for every j, the maximum profit
        // among earlier items priced strictly below prices[j] and among
        // later items priced strictly above prices[j]; the right pass runs
        // the same prefix queries over reversed ranks. Every profit is >= 1,
        // so a query result of 0 means "no such item exists". With n up to
        // 5 * 10^4 these two log-passes are what keep the scan linear-ish.
        int n = (int)prices.size();
        vector<int> ranks(prices);
        sort(ranks.begin(), ranks.end());
        ranks.erase(unique(ranks.begin(), ranks.end()), ranks.end());
        int m = (int)ranks.size();
        auto rank_of = [&](int p) { return (int)(lower_bound(ranks.begin(), ranks.end(), p) - ranks.begin()) + 1; };
        auto query = [](vector<int> &tree, int i) {
            int best = 0;
            for (; i > 0; i -= i & -i) {
                best = max(best, tree[i]);
            }
            return best;
        };
        auto update = [&](vector<int> &tree, int i, int gain) {
            for (; i <= m; i += i & -i) {
                tree[i] = max(tree[i], gain);
            }
        };
        vector<int> tree(m + 1, 0), left(n, 0), right(n, 0);
        for (int j = 0; j < n; ++j) {
            int r = rank_of(prices[j]);
            left[j] = query(tree, r - 1);
            update(tree, r, profits[j]);
        }
        fill(tree.begin(), tree.end(), 0);
        for (int j = n - 1; j >= 0; --j) {
            int r = m + 1 - rank_of(prices[j]);
            right[j] = query(tree, r - 1);
            update(tree, r, profits[j]);
        }
        int best = -1;
        for (int j = 0; j < n; ++j) {
            if (left[j] > 0 && right[j] > 0) {
                best = max(best, left[j] + profits[j] + right[j]);
            }
        }
        return best;
    }
};
