class Solution {

    public int minimumArea(int[][] grid) {
        // Every 1 must lie inside the answer, so the rectangle is pinned to
        // the topmost, bottommost, leftmost and rightmost 1; any smaller box
        // would exclude one of those extreme cells. One sweep tracking the
        // four extremes settles it.
        int minRow = grid.length;
        int maxRow = -1;
        int minCol = grid[0].length;
        int maxCol = -1;
        for (int i = 0; i < grid.length; i++) {
            boolean hasOne = false;
            int first = -1;
            int last = -1;
            for (int j = 0; j < grid[i].length; j++) {
                if (grid[i][j] == 1) {
                    if (!hasOne) {
                        first = j;
                        hasOne = true;
                    }
                    last = j;
                }
            }
            if (!hasOne) {
                continue;
            }
            minRow = Math.min(minRow, i);
            maxRow = i;
            minCol = Math.min(minCol, first);
            maxCol = Math.max(maxCol, last);
        }
        return (maxRow - minRow + 1) * (maxCol - minCol + 1);
    }
}
