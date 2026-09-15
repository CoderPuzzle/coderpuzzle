class Solution {
  public:
    long long minMoves(vector<int> &balance) {
        // At most one person is negative. With none, nobody moves; with a
        // negative total, no arrangement can work. Otherwise every unit a
        // giver releases costs one move per hop of its circular distance
        // to the negative index, so draining the deficit from the nearest
        // givers first — cheapest distance, then the next, and so on —
        // totals the minimum. Moves reach ~1e14, hence long long.
        int n = balance.size();
        int neg = -1;
        for (int i = 0; i < n; ++i) {
            if (balance[i] < 0) {
                neg = i;
                break;
            }
        }
        if (neg == -1) {
            return 0;
        }
        long long total = 0;
        for (int v : balance) {
            total += v;
        }
        if (total < 0) {
            return -1;
        }
        vector<pair<int, long long>> supplies;
        for (int i = 0; i < n; ++i) {
            if (i != neg && balance[i] > 0) {
                int cw = (i - neg + n) % n;
                int ccw = (neg - i + n) % n;
                supplies.push_back({min(cw, ccw), (long long)balance[i]});
            }
        }
        sort(supplies.begin(), supplies.end());
        long long need = -(long long)balance[neg];
        long long moves = 0;
        for (auto &[dist, amount] : supplies) {
            if (need == 0) {
                break;
            }
            long long take = min(amount, need);
            moves += take * dist;
            need -= take;
        }
        return moves;
    }
};
