class Solution {

    public boolean removeOnes(int[][] grid) {
        for (int row = 0; row < grid.length; row++) {
            for (int column = 0; column < grid[0].length; column++) {
                if ((grid[row][column] ^ grid[row][0] ^ grid[0][column] ^ grid[0][0]) != 0) {
                    return false;
                }
            }
        }
        return true;
    }
}
