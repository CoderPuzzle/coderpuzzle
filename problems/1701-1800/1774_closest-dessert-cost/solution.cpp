class Solution {
  public:
    int closestCost(vector<int> &baseCosts, vector<int> &toppingCosts, int target) {
        // Reachable topping totals: start from {0}; each topping price t
        // maps every sum s to s, s + t, s + 2t, built in place by sweeping
        // the array downward so marks made this round are never reused as
        // sources. Scanning the totals against every base, the best dessert
        // cost minimizes |b + s - target|, ties broken toward the smaller
        // cost. Totals stay under 210001, well inside 32-bit range.
        int cap = 0;
        for (int t : toppingCosts)
            cap += 2 * t;
        vector<char> reachable(cap + 1, 0);
        reachable[0] = 1;
        for (int t : toppingCosts) {
            for (int s = cap; s >= 0; --s) {
                if (!reachable[s])
                    continue;
                if (s + t <= cap)
                    reachable[s + t] = 1;
                if (s + 2 * t <= cap)
                    reachable[s + 2 * t] = 1;
            }
        }
        int best = 0, bestDist = INT_MAX;
        for (int b : baseCosts) {
            for (int s = 0; s <= cap; ++s) {
                if (!reachable[s])
                    continue;
                int cost = b + s;
                int dist = abs(cost - target);
                if (dist < bestDist || (dist == bestDist && cost < best)) {
                    bestDist = dist;
                    best = cost;
                }
            }
        }
        return best;
    }
};
