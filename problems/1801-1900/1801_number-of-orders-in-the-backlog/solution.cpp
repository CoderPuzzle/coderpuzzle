class Solution {
  public:
    int getNumberOfBacklogOrders(vector<vector<int>> &orders) {
        // Two heaps: sells as a min-heap on price, buys as a max-heap. An
        // incoming batch trades with the best-priced opposing batch while
        // the price condition holds; only its unmatched remainder joins
        // the backlog as one new batch.
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> sells;
        priority_queue<pair<int, int>> buys;
        for (auto &order : orders) {
            int price = order[0], amount = order[1];
            if (order[2] == 0) {
                while (amount > 0 && !sells.empty() && sells.top().first <= price) {
                    auto [p, a] = sells.top();
                    sells.pop();
                    int take = min(amount, a);
                    amount -= take;
                    a -= take;
                    if (a > 0)
                        sells.push({p, a});
                }
                if (amount > 0)
                    buys.push({price, amount});
            } else {
                while (amount > 0 && !buys.empty() && buys.top().first >= price) {
                    auto [p, a] = buys.top();
                    buys.pop();
                    int take = min(amount, a);
                    amount -= take;
                    a -= take;
                    if (a > 0)
                        buys.push({p, a});
                }
                if (amount > 0)
                    sells.push({price, amount});
            }
        }
        // Totals reach 1e5 * 1e9 = 1e14, so the sum is accumulated in
        // 64-bit integers and reduced modulo 1e9 + 7 at the end.
        long long total = 0;
        while (!sells.empty()) {
            total += sells.top().second;
            sells.pop();
        }
        while (!buys.empty()) {
            total += buys.top().second;
            buys.pop();
        }
        return total % 1000000007LL;
    }
};
