class Solution {
  public:
    long long minimumMoney(vector<vector<int>> &transactions) {
        long long total_lose = 0;
        long long max_cashback_losing = 0;
        long long max_cost_winning = 0;
        for (auto &t : transactions) {
            long long cost = t[0], cashback = t[1];
            // losers (cashback < cost) drain money permanently; winners don't
            if (cashback < cost) {
                // losers' total drain is fixed regardless of ordering
                total_lose += cost - cashback;
                // worst order: largest-cashback loser goes last, after every
                // other drain, yet its full cost must still be covered
                if (cashback > max_cashback_losing)
                    max_cashback_losing = cashback;
            } else {
                // winners only matter via their largest upfront cost, paid at
                // the lowest-funds point (right after the losing block)
                if (cost > max_cost_winning)
                    max_cost_winning = cost;
            }
        }
        // answer = total_lose + max(last loser's cashback, top winner's cost)
        return total_lose + max(max_cashback_losing, max_cost_winning);
    }
};
