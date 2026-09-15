class Solution {

    public int minimumOperations(int[][] grid) {
        // Vertical equality makes each column one constant value;
        // horizontal inequality only links adjacent columns. dp[v] =
        // cheapest total for processed columns ending with value v,
        // extended over the ten digits that grid cells may hold.
        int rows = grid.length;
        int[] previous = new int[10];
        for (int j = 0; j < grid[0].length; j++) {
            int[] counts = new int[10];
            for (int[] row : grid) {
                counts[row[j]]++;
            }
            int[] current = new int[10];
            for (int value = 0; value < 10; value++) {
                int bestPrev = Integer.MAX_VALUE;
                for (int k = 0; k < 10; k++) {
                    if (k != value && previous[k] < bestPrev) {
                        bestPrev = previous[k];
                    }
                }
                current[value] = rows - counts[value] + bestPrev;
            }
            previous = current;
        }
        int best = Integer.MAX_VALUE;
        for (int value : previous) {
            best = Math.min(best, value);
        }
        return best;
    }
}
