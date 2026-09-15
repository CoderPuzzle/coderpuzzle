class Solution {

    public int maxSizeSlices(int[] slices) {
        if (slices.length == 1) return slices[0];
        int k = slices.length / 3;

        // dp[i][j] = best value using the first i entries, picking exactly j,
        // with no two chosen adjacent.
        // Returns the two linear sub-answers via out param to avoid generics.
        int withoutLast = rob(slices, 0, slices.length - 1, k);
        int withoutFirst = rob(slices, 1, slices.length, k);
        return Math.max(withoutLast, withoutFirst);
    }

    // best value picking exactly `picks` non-adjacent entries from arr[from..to)
    private int rob(int[] arr, int from, int to, int picks) {
        int length = to - from;
        int[][] dp = new int[length + 1][picks + 1];
        for (int i = 0; i <= length; i++) {
            for (int j = 0; j <= picks; j++) {
                dp[i][j] = -1;
            }
        }
        dp[0][0] = 0;
        for (int i = 1; i <= length; i++) {
            for (int j = 0; j <= picks; j++) {
                dp[i][j] = dp[i - 1][j];
                if (j >= 1) {
                    int base;
                    if (i >= 2) {
                        base = dp[i - 2][j - 1];
                    } else {
                        base = j == 1 ? 0 : -1;
                    }
                    if (base >= 0 && base + arr[from + i - 1] > dp[i][j]) {
                        dp[i][j] = base + arr[from + i - 1];
                    }
                }
            }
        }
        return dp[length][picks];
    }
}
