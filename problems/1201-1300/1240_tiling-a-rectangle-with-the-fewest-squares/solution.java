class Solution {

    public int tilingRectangle(int n, int m) {
        this.n = n;
        this.m = m;
        heights = new int[m];
        best[0] = n * m; // the all-1x1 tiling is always available
        backtrack(0);
        return best[0];
    }

    private int n, m;
    private int[] heights;
    private int[] best = new int[1];

    private void backtrack(int count) {
        if (count >= best[0]) return;
        int column = findHole();
        if (heights[column] == n) {
            best[0] = count; // every column full
            return;
        }
        // Largest side first: finds a strong incumbent early.
        int maxSide = Math.min(n - heights[column], m - column);
        for (int side = maxSide; side >= 1; --side) {
            if (!canPlace(column, side)) continue;
            for (int c = column; c < column + side; ++c) heights[c] += side;
            backtrack(count + 1);
            for (int c = column; c < column + side; ++c) heights[c] -= side;
        }
    }

    // The first column whose top is lowest names the next uncovered cell.
    private int findHole() {
        int column = 0;
        for (int c = 1; c < m; ++c) {
            if (heights[c] < heights[column]) column = c;
        }
        return column;
    }

    private boolean canPlace(int column, int side) {
        for (int c = column; c < column + side; ++c) {
            if (heights[c] != heights[column]) return false;
        }
        return true;
    }
}
