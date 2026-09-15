import java.util.Arrays;

class Solution {

    public int calculateMinimumHP(int[][] dungeon) {
        // need[j] is the least health that saves the knight from column j of
        // the row being folded; index n is a sentinel wall past the right edge.
        int n = dungeon[0].length;
        int[] need = new int[n + 1];
        Arrays.fill(need, 1_000_000_000);
        need[n - 1] = 1;
        for (int i = dungeon.length - 1; i >= 0; --i) {
            for (int j = n - 1; j >= 0; --j) {
                // Scan right-to-left: need[j] is still the room below while
                // need[j + 1] is already this row, exactly the two moves.
                need[j] = Math.max(1, Math.min(need[j], need[j + 1]) - dungeon[i][j]);
            }
        }
        return need[0];
    }
}
