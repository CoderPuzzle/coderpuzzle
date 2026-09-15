class Solution {
  public:
    int shoppingOffers(vector<int> &price, vector<vector<int>> &special, vector<int> &needs) {
        // Memoized DFS over the remaining-needs vector. Every state offers
        // the same two move kinds: buy one unit of any still-wanted item at
        // its list price, or apply any special offer that fits inside the
        // state — the fit check is what forbids buying more than wanted.
        int n = price.size();
        long long size = 1;
        for (int i = 0; i < n; ++i) {
            size *= 11;
        }
        vector<int> memo(size, -1);
        vector<int> cur = needs;
        return dfs(price, special, memo, cur);
    }

  private:
    static int dfs(vector<int> &price, vector<vector<int>> &special, vector<int> &memo, vector<int> &cur) {
        int n = price.size();
        // Counts stay at most 10, so cur packs into one base-11 integer.
        int key = 0;
        bool empty = true;
        for (int i = 0; i < n; ++i) {
            key = key * 11 + cur[i];
            if (cur[i] > 0) {
                empty = false;
            }
        }
        if (empty) {
            return 0;
        }
        if (memo[key] != -1) {
            return memo[key];
        }
        int best = numeric_limits<int>::max() / 2;
        // Move kind 1: one unit of item i, bought individually.
        for (int i = 0; i < n; ++i) {
            if (cur[i] > 0) {
                --cur[i];
                best = min(best, price[i] + dfs(price, special, memo, cur));
                ++cur[i];
            }
        }
        // Move kind 2: a special offer, when it fits within cur.
        for (const vector<int> &offer : special) {
            bool fits = true;
            for (int j = 0; j < n; ++j) {
                if (offer[j] > cur[j]) {
                    fits = false;
                    break;
                }
            }
            if (fits) {
                for (int j = 0; j < n; ++j) {
                    cur[j] -= offer[j];
                }
                best = min(best, offer[n] + dfs(price, special, memo, cur));
                for (int j = 0; j < n; ++j) {
                    cur[j] += offer[j];
                }
            }
        }
        memo[key] = best;
        return best;
    }
};
