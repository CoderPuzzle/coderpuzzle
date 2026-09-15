class Solution {

    public int calculateMinimumHP(int[][] dungeon) {
        int m = dungeon.length;
        int n = dungeon[0].length;
        final int INF = Integer.MAX_VALUE / 2;
        // need[i][j]: smallest health needed when ENTERING (i, j) so some
        // right/down path survives to the princess. An INF border keeps
        // out-of-bounds neighbors from ever being chosen.
        int[][] need = new int[m + 1][n + 1];
        for (int[] row : need) {
            java.util.Arrays.fill(row, INF);
        }
        // Seed: leaving the bottom-right room requires at least 1 health.
        need[m][n - 1] = 1;
        // Fill bottom-to-top, right-to-left so both onward values are final.
        for (int i = m - 1; i >= 0; i--) {
            for (int j = n - 1; j >= 0; j--) {
                // Take the cheaper onward room, pay this room's effect.
                int bestNext = Math.min(need[i + 1][j], need[i][j + 1]);
                // Health must stay at least 1 — 0 or below is fatal.
                need[i][j] = Math.max(1, bestNext - dungeon[i][j]);
            }
        }
        return need[0][0];
    }
}
