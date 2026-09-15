import java.util.Arrays;

class Solution {

    private int[] boxes;
    private int[][][] memo;

    public int removeBoxes(int[] boxes) {
        // Memoized interval DP. dfs(l, r, k) is the best score from
        // boxes[l..r] when k boxes of boxes[l]'s color, already removed
        // from outside the interval, sit glued to its left and will join
        // its group.
        int n = boxes.length;
        this.boxes = boxes;
        memo = new int[n][n][n + 1];
        for (int[][] plane : memo) {
            for (int[] row : plane) {
                Arrays.fill(row, -1);
            }
        }
        return dfs(0, n - 1, 0);
    }

    private int dfs(int l, int r, int k) {
        if (l > r) {
            return 0;
        }
        // Adjacent same-colored boxes never need separate treatment:
        // holding boxes[l] until its identical neighbor leaves only grows
        // the eventual group, so the run joins the carry.
        while (l < r && boxes[l + 1] == boxes[l]) {
            ++l;
            ++k;
        }
        int cached = memo[l][r][k];
        if (cached != -1) {
            return cached;
        }
        // Either take boxes[l] and its carry now, scoring (k+1)^2...
        int best = (k + 1) * (k + 1) + dfs(l + 1, r, 0);
        // ...or hold it: clear boxes[l+1..m-1] first, so boxes[l] meets
        // the next same-colored box one richer in the carry.
        for (int m = l + 1; m <= r; ++m) {
            if (boxes[m] == boxes[l]) {
                best = Math.max(best, dfs(l + 1, m - 1, 0) + dfs(m, r, k + 1));
            }
        }
        memo[l][r][k] = best;
        return best;
    }
}
