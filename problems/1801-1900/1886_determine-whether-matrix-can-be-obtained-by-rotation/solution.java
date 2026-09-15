class Solution {

    // Try each of the four orientations. Clockwise rotation:
    // new[r][c] = old[n-1-c][r].
    public boolean findRotation(int[][] mat, int[][] target) {
        int n = mat.length;
        int[][] cur = mat;
        for (int t = 0; t < 4; t++) {
            if (java.util.Arrays.deepEquals(cur, target)) {
                return true;
            }
            int[][] nxt = new int[n][n];
            for (int r = 0; r < n; r++) {
                for (int c = 0; c < n; c++) {
                    nxt[r][c] = cur[n - 1 - c][r];
                }
            }
            cur = nxt;
        }
        return false;
    }
}
