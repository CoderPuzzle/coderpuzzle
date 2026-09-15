class NeighborSum {

    // Construction indexes where every value lives; each query looks the
    // value up once and adds its four in-bounds neighbors straight off the
    // grid. Distinct values make the index exact, and edge cells simply
    // find fewer in-bounds neighbors — no corner or border special cases.
    private final int[][] grid;
    private final int n;
    private final int[] rowOf;
    private final int[] colOf;

    public NeighborSum(int[][] grid) {
        // One walk builds the whole index: values are distinct and run
        // 0..n*n-1, so each value's cell can be stored at its own slot.
        this.grid = grid;
        this.n = grid.length;
        this.rowOf = new int[n * n];
        this.colOf = new int[n * n];
        for (int r = 0; r < n; r++) {
            for (int c = 0; c < n; c++) {
                rowOf[grid[r][c]] = r;
                colOf[grid[r][c]] = c;
            }
        }
    }

    public int adjacentSum(int value) {
        int r = rowOf[value];
        int c = colOf[value];
        int total = 0;
        int[][] offsets = { { -1, 0 }, { 1, 0 }, { 0, -1 }, { 0, 1 } };
        for (int[] offset : offsets) {
            int nr = r + offset[0];
            int nc = c + offset[1];
            if (nr >= 0 && nr < n && nc >= 0 && nc < n) {
                total += grid[nr][nc];
            }
        }
        return total;
    }

    public int diagonalSum(int value) {
        int r = rowOf[value];
        int c = colOf[value];
        int total = 0;
        int[][] offsets = { { -1, -1 }, { -1, 1 }, { 1, -1 }, { 1, 1 } };
        for (int[] offset : offsets) {
            int nr = r + offset[0];
            int nc = c + offset[1];
            if (nr >= 0 && nr < n && nc >= 0 && nc < n) {
                total += grid[nr][nc];
            }
        }
        return total;
    }
}
