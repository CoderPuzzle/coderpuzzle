import java.util.Arrays;

class Solution {

    public int maxTotalReward(int[] rewardValues) {
        // Every legal play takes its rewards in strictly increasing
        // value order — the next value must exceed a running total that
        // already contains everything taken before it — and two copies
        // of the same value can never both be used. So after sorting,
        // reachable[t] tracks achievable totals: value v extends
        // exactly from totals t < v, scanned descending so each copy is
        // used at most once. Totals stay below 2 * max <= 4000 because
        // the last pick exceeds everything collected before it.
        int[] vals = rewardValues.clone();
        Arrays.sort(vals);
        int cap = 2 * vals[vals.length - 1];
        boolean[] reachable = new boolean[cap + 1];
        reachable[0] = true;
        int best = 0;
        for (int v : vals) {
            int top = Math.min(best, v - 1);
            for (int t = top; t >= 0; --t) {
                if (!reachable[t]) {
                    continue;
                }
                reachable[t + v] = true;
                if (t + v > best) {
                    best = t + v;
                }
            }
        }
        return best;
    }
}
