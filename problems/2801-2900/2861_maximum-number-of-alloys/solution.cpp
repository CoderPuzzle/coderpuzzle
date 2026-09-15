class Solution {
  public:
    int maxNumberOfAlloys(int n, int k, int budget, vector<vector<int>> &composition, vector<int> &stock,
                          vector<int> &cost) {
        // Binary search the alloy count. Making x alloys on one machine
        // costs sum(max(0, x * composition[m][j] - stock[j]) * cost[j])
        // coins, which never decreases as x grows, so affordability is
        // monotone and the largest feasible count can be bisected. The
        // count is bounded by min(stock) + budget: the metal with the
        // smallest stock needs at least x - stock[j] units bought and any
        // unit costs at least one coin. Every machine is probed per
        // candidate count; the spend total reaches about 2e12, wider
        // than signed 32-bit, so it is accumulated in long long.
        auto affordable = [&](const vector<int> &machine, long long count) {
            long long spent = 0;
            for (int j = 0; j < n; ++j) {
                long long need = count * machine[j] - stock[j];
                if (need > 0) {
                    spent += need * cost[j];
                    if (spent > budget)
                        return false;
                }
            }
            return true;
        };
        long long low = 0;
        long long high = *min_element(stock.begin(), stock.end()) + (long long)budget;
        int best = 0;
        while (low <= high) {
            long long mid = low + (high - low) / 2;
            bool ok = false;
            for (int m = 0; m < k && !ok; ++m)
                ok = affordable(composition[m], mid);
            if (ok) {
                best = (int)mid;
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return best;
    }
};
