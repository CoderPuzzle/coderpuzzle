class Solution {

    public int minPathCost(int[][] grid, int[][] moveCost) {
        int rows = grid.length;
        int columns = grid[0].length;
        int[] costs = new int[columns];
        for (int column = 0; column < columns; column++) {
            costs[column] = grid[0][column];
        }
        for (int row = 1; row < rows; row++) {
            int[] previous = grid[row - 1];
            int[] next = new int[columns];
            for (int column = 0; column < columns; column++) {
                int best = Integer.MAX_VALUE;
                for (int source = 0; source < columns; source++) {
                    best = Math.min(best, costs[source] + moveCost[previous[source]][column]);
                }
                next[column] = best + grid[row][column];
            }
            costs = next;
        }
        int answer = costs[0];
        for (int column = 1; column < columns; column++) {
            answer = Math.min(answer, costs[column]);
        }
        return answer;
    }
}
