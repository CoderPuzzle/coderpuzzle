class Solution {

    public boolean possibleToStamp(int[][] grid, int stampHeight, int stampWidth) {
        int rows = grid.length;
        int columns = grid[0].length;
        int[][] occupied = new int[rows + 1][columns + 1];
        for (int row = 0; row < rows; row++) {
            for (int column = 0; column < columns; column++) {
                occupied[row + 1][column + 1] =
                    grid[row][column] + occupied[row][column + 1] + occupied[row + 1][column] - occupied[row][column];
            }
        }

        int[][] difference = new int[rows + 1][columns + 1];
        for (int top = 0; top + stampHeight <= rows; top++) {
            int bottom = top + stampHeight;
            for (int left = 0; left + stampWidth <= columns; left++) {
                int right = left + stampWidth;
                int total =
                    occupied[bottom][right] - occupied[top][right] - occupied[bottom][left] + occupied[top][left];
                if (total == 0) {
                    difference[top][left]++;
                    difference[bottom][left]--;
                    difference[top][right]--;
                    difference[bottom][right]++;
                }
            }
        }

        for (int row = 0; row < rows; row++) {
            for (int column = 0; column < columns; column++) {
                if (row > 0) {
                    difference[row][column] += difference[row - 1][column];
                }
                if (column > 0) {
                    difference[row][column] += difference[row][column - 1];
                }
                if (row > 0 && column > 0) {
                    difference[row][column] -= difference[row - 1][column - 1];
                }
                if (grid[row][column] == 0 && difference[row][column] == 0) {
                    return false;
                }
            }
        }
        return true;
    }
}
