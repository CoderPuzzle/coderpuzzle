class Solution {
  public:
    int maxTotalReward(vector<int> &rewardValues) {
        // Every legal play takes its rewards in strictly increasing
        // value order — the next value must exceed a running total that
        // already contains everything taken before it — and two copies
        // of the same value can never both be used. So after sorting,
        // reachable[t] tracks achievable totals: value v extends
        // exactly from totals t < v, scanned descending so each copy is
        // used at most once. Totals stay below 2 * max <= 4000 because
        // the last pick exceeds everything collected before it.
        vector<int> vals = rewardValues;
        sort(vals.begin(), vals.end());
        int cap = 2 * vals.back();
        vector<char> reachable(cap + 1, 0);
        reachable[0] = 1;
        int best = 0;
        for (int v : vals) {
            int top = min(best, v - 1);
            for (int t = top; t >= 0; --t) {
                if (!reachable[t])
                    continue;
                reachable[t + v] = 1;
                best = max(best, t + v);
            }
        }
        return best;
    }
};
