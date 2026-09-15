import java.util.Arrays;

class Solution {

    private String s;
    private int[][] memo;

    public int getLengthOfOptimalCompression(String s, int k) {
        // dp(i, budget) is the shortest encoding of s[i:] using at most
        // `budget` more deletions. Memoized on (i, budget), both bounded
        // by n.
        this.s = s;
        int n = s.length();
        memo = new int[n + 1][k + 1];
        for (int[] row : memo) {
            Arrays.fill(row, -1);
        }
        return dp(0, k);
    }

    private int dp(int i, int budget) {
        int n = s.length();
        if (n - i <= budget) {
            // Every remaining character can simply be deleted.
            return 0;
        }
        int cached = memo[i][budget];
        if (cached != -1) {
            return cached;
        }
        // Delete s[i] outright and move on.
        int best = budget > 0 ? dp(i + 1, budget - 1) : Integer.MAX_VALUE;
        // Or keep a run of s[i]'s character: scan forward, paying one
        // deletion for every mismatched character folded into the run.
        int same = 0;
        int diff = 0;
        for (int j = i; j < n; ++j) {
            if (s.charAt(j) == s.charAt(i)) {
                ++same;
            } else {
                ++diff;
                if (diff > budget) {
                    break;
                }
            }
            best = Math.min(best, calcLen(same) + dp(j + 1, budget - diff));
        }
        memo[i][budget] = best;
        return best;
    }

    private static int calcLen(int count) {
        if (count == 0) return 0;
        if (count == 1) return 1;
        if (count < 10) return 2;
        if (count < 100) return 3;
        return 4;
    }
}
