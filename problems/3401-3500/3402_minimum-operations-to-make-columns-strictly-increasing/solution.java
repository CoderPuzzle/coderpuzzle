class Solution {

    public int minimumOperations(int[][] grid) {
        // Columns are independent: a cell only has to top the cell directly
        // above it, so one top-to-bottom sweep settles everything. Raising
        // each cell to exactly one above the cell above is the pointwise
        // minimum final column, so no cheaper fix exists.
        int[] previous = grid[0].clone();
        int operations = 0;
        for (int i = 1; i < grid.length; ++i) {
            for (int j = 0; j < grid[i].length; ++j) {
                if (grid[i][j] <= previous[j]) {
                    operations += previous[j] + 1 - grid[i][j];
                    previous[j] += 1;
                } else {
                    previous[j] = grid[i][j];
                }
            }
        }
        return operations;
    }
}
