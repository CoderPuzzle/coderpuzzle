class Solution {

    public long minIncrements(int n, int[] cost) {
        // Walk heap indices from the deepest parent up to the root. At
        // each node the two child subtrees must end on a common maximum,
        // so their difference is charged once and the larger combined
        // maximum travels up. Sibling sums differ by less than 2^21, but
        // the charges accumulate past 2^31, hence the long accumulator.
        long[] subtree = new long[n];
        for (int i = 0; i < n; ++i) {
            subtree[i] = cost[i];
        }
        long total = 0;
        for (int node = n / 2; node >= 1; --node) {
            long left = subtree[2 * node - 1];
            long right = subtree[2 * node];
            total += Math.abs(left - right);
            subtree[node - 1] = Math.max(left, right) + cost[node - 1];
        }
        return total;
    }
}
