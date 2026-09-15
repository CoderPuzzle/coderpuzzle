class Solution {

    public QuadNode construct(int[][] grid) {
        return build(grid, 0, 0, grid.length);
    }

    private QuadNode build(int[][] grid, int r0, int c0, int size) {
        int first = grid[r0][c0];
        boolean uniform = true;
        scan: for (int r = r0; r < r0 + size; ++r) {
            for (int c = c0; c < c0 + size; ++c) {
                if (grid[r][c] != first) {
                    uniform = false;
                    break scan;
                }
            }
        }
        if (uniform) return new QuadNode(first == 1, true);
        int half = size / 2;
        QuadNode node = new QuadNode(false, false);
        node.topLeft = build(grid, r0, c0, half);
        node.topRight = build(grid, r0, c0 + half, half);
        node.bottomLeft = build(grid, r0 + half, c0, half);
        node.bottomRight = build(grid, r0 + half, c0 + half, half);
        return node;
    }
}
