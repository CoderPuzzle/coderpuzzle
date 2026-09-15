class Solution {
  public:
    vector<int> cheapestJump(vector<int> &coins, int maxJump) {
        // Suffix costs, built right to left: cost[i] is the cheapest total
        // for the rest of the walk when standing on i, coins[i] included,
        // while UNREACHABLE marks blocked or stranded cells and is never
        // added to. Scanning the window i+1..i+maxJump in increasing index
        // order and replacing the best only on a strict improvement leaves
        // next[i] at the SMALLEST index achieving the minimum continuation,
        // so the lexicographic tie rule is stored in the table itself.
        const int UNREACHABLE = 101 * 1000 + 1;
        int n = (int)coins.size();
        vector<int> cost(n, UNREACHABLE), next(n, -1);
        if (coins[n - 1] != -1) {
            cost[n - 1] = coins[n - 1];
        }
        for (int i = n - 2; i >= 0; --i) {
            if (coins[i] == -1) {
                continue;
            }
            int best = UNREACHABLE, bestFrom = -1;
            int limit = min(i + maxJump, n - 1);
            for (int j = i + 1; j <= limit; ++j) {
                if (cost[j] < best) {
                    best = cost[j];
                    bestFrom = j;
                }
            }
            if (bestFrom != -1) {
                cost[i] = coins[i] + best;
                next[i] = bestFrom;
            }
        }
        // The walk from index 1 follows next[] and is the lexicographically
        // smallest minimum-cost path: at every divergence between two
        // equal-cost optimal paths the smaller next index wins outright,
        // whatever the remaining suffixes do.
        vector<int> path;
        if (cost[0] != UNREACHABLE) {
            for (int i = 0; i != -1; i = next[i]) {
                path.push_back(i + 1);
            }
        }
        return path;
    }
};
