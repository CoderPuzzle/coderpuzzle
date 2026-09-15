class Solution {

    public int countPyramids(int[][] grid) {
        return countDirection(grid, false) + countDirection(grid, true);
    }

    private int countDirection(int[][] grid, boolean forward) {
        int rows = grid.length;
        int columns = grid[0].length;
        int[] towardBase = new int[columns];
        int total = 0;
        for (int offset = 0; offset < rows; offset++) {
            int row = forward ? offset : rows - 1 - offset;
            int[] current = new int[columns];
            for (int column = 0; column < columns; column++) {
                if (grid[row][column] == 0) {
                    continue;
                }
                current[column] = 1;
                if (column > 0 && column + 1 < columns && towardBase[column] > 0) {
                    current[column] += Math.min(towardBase[column - 1], towardBase[column + 1]);
                }
                total += current[column] - 1;
            }
            towardBase = current;
        }
        return total;
    }
}
