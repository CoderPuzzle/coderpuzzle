class Solution {

    public boolean checkXMatrix(int[][] grid) {
        int size = grid.length;
        for (int row = 0; row < size; row++) {
            for (int col = 0; col < size; col++) {
                if (row == col || row + col == size - 1) {
                    if (grid[row][col] == 0) {
                        return false;
                    }
                } else if (grid[row][col] != 0) {
                    return false;
                }
            }
        }
        return true;
    }
}
