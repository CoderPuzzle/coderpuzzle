class Solution {

    public int countNegatives(int[][] grid) {
        // Negatives are a per-row suffix and the boundary only moves left
        // down the columns, so one monotonically sliding pointer counts all.
        int n = grid[0].length;
        int count = 0;
        int col = n - 1;
        for (int[] row : grid) {
            while (col >= 0 && row[col] < 0) {
                --col;
            }
            count += n - 1 - col;
        }
        return count;
    }
}
