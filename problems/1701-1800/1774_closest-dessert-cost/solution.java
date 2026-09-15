class Solution {

    public int closestCost(int[] baseCosts, int[] toppingCosts, int target) {
        // Reachable topping totals: start from {0}; each topping price t
        // maps every sum s to s, s + t, s + 2t, built in place by sweeping
        // the array downward so marks made this round are never reused as
        // sources. Scanning the totals against every base, the best dessert
        // cost minimizes |b + s - target|, ties broken toward the smaller
        // cost. Totals stay under 210001, well inside 32-bit range.
        int cap = 0;
        for (int t : toppingCosts) cap += 2 * t;
        boolean[] reachable = new boolean[cap + 1];
        reachable[0] = true;
        for (int t : toppingCosts) {
            for (int s = cap; s >= 0; --s) {
                if (!reachable[s]) continue;
                if (s + t <= cap) reachable[s + t] = true;
                if (s + 2 * t <= cap) reachable[s + 2 * t] = true;
            }
        }
        int best = 0,
            bestDist = Integer.MAX_VALUE;
        for (int b : baseCosts) {
            for (int s = 0; s <= cap; ++s) {
                if (!reachable[s]) continue;
                int cost = b + s;
                int dist = Math.abs(cost - target);
                if (dist < bestDist || (dist == bestDist && cost < best)) {
                    bestDist = dist;
                    best = cost;
                }
            }
        }
        return best;
    }
}
