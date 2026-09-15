import java.util.Arrays;

class Solution {

    public int findMinimumTime(int[] strength, int k) {
        // Breaking lock i as the j-th lock (0-based) takes
        // ceil(strength[i] / (1 + j*k)) minutes, because the sword banks
        // 1 + j*k energy per minute. Which locks are already broken is all
        // that matters, so a bitmask DP works: best[mask] is the minimum
        // minutes to break exactly the locks in mask, and each unbroken
        // lock i extends mask at the cost of one ceil division by the next
        // slot's factor 1 + popcount(mask)*k. Every mask is finite before
        // it is processed (its submasks come first), so MAX_VALUE never
        // overflows. n <= 8 keeps this at a few thousand moves.
        int n = strength.length;
        int[] best = new int[1 << n];
        Arrays.fill(best, Integer.MAX_VALUE);
        best[0] = 0;
        for (int mask = 0; mask < 1 << n; mask++) {
            int factor = 1 + Integer.bitCount(mask) * k;
            for (int i = 0; i < n; i++) {
                if (((mask >> i) & 1) == 0) {
                    int cost = best[mask] + (strength[i] + factor - 1) / factor;
                    if (cost < best[mask | (1 << i)]) {
                        best[mask | (1 << i)] = cost;
                    }
                }
            }
        }
        return best[(1 << n) - 1];
    }
}
