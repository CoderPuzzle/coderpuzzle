import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    public int[] cheapestJump(int[] coins, int maxJump) {
        // Suffix costs, built right to left: cost[i] is the cheapest total
        // for the rest of the walk when standing on i, coins[i] included,
        // while UNREACHABLE marks blocked or stranded cells and is never
        // added to. Scanning the window i+1..i+maxJump in increasing index
        // order and replacing the best only on a strict improvement leaves
        // next[i] at the SMALLEST index achieving the minimum continuation,
        // so the lexicographic tie rule is stored in the table itself.
        final int UNREACHABLE = 101 * 1000 + 1;
        int n = coins.length;
        int[] cost = new int[n];
        int[] next = new int[n];
        Arrays.fill(cost, UNREACHABLE);
        Arrays.fill(next, -1);
        if (coins[n - 1] != -1) {
            cost[n - 1] = coins[n - 1];
        }
        for (int i = n - 2; i >= 0; --i) {
            if (coins[i] == -1) {
                continue;
            }
            int best = UNREACHABLE,
                bestFrom = -1;
            int limit = Math.min(i + maxJump, n - 1);
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
        if (cost[0] == UNREACHABLE) {
            return new int[0];
        }
        // The walk from index 1 follows next[] and is the lexicographically
        // smallest minimum-cost path: at every divergence between two
        // equal-cost optimal paths the smaller next index wins outright,
        // whatever the remaining suffixes do.
        List<Integer> path = new ArrayList<>();
        for (int i = 0; i != -1; i = next[i]) {
            path.add(i + 1);
        }
        int[] result = new int[path.size()];
        for (int index = 0; index < result.length; ++index) {
            result[index] = path.get(index);
        }
        return result;
    }
}
