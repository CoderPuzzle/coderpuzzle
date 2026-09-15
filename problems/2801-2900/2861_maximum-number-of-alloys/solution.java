class Solution {

    public int maxNumberOfAlloys(int n, int k, int budget, int[][] composition, int[] stock, int[] cost) {
        // Binary search the alloy count. Making x alloys on one machine
        // costs sum(max(0, x * composition[m][j] - stock[j]) * cost[j])
        // coins, which never decreases as x grows, so affordability is
        // monotone and the largest feasible count can be bisected. The
        // count is bounded by min(stock) + budget: the metal with the
        // smallest stock needs at least x - stock[j] units bought and any
        // unit costs at least one coin. Every machine is probed per
        // candidate count; the spend total reaches about 2e12, wider
        // than int, so it is accumulated in long.
        long low = 0;
        int minStock = Integer.MAX_VALUE;
        for (int s : stock) {
            minStock = Math.min(minStock, s);
        }
        long high = (long) minStock + budget;
        int best = 0;
        while (low <= high) {
            long mid = low + (high - low) / 2;
            boolean ok = false;
            for (int m = 0; m < k && !ok; m++) {
                long spent = 0;
                for (int j = 0; j < n && spent <= budget; j++) {
                    long need = mid * (long) composition[m][j] - stock[j];
                    if (need > 0) {
                        spent += need * cost[j];
                    }
                }
                ok = spent <= budget;
            }
            if (ok) {
                best = (int) mid;
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return best;
    }
}
