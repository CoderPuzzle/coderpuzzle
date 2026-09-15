class Solution {

    public int regionsBySlashes(String[] grid) {
        // Blow every square up into a 3x3 block and paint its wall as
        // blocked pixels along the block's diagonal: '/' fills the
        // anti-diagonal, '\' the main diagonal, a blank fills nothing.
        // Corner contacts survive the upscale because the diagonals of two
        // blocks meeting at a corner leave the pixels beside them open, so
        // the regions are just the connected components of open pixels — an
        // explicit-stack flood fill counts them.
        int n = grid.length;
        int size = 3 * n;
        boolean[][] blocked = new boolean[size][size];
        for (int i = 0; i < n; ++i) {
            for (int j = 0; j < n; ++j) {
                char ch = grid[i].charAt(j);
                if (ch == '/') {
                    blocked[3 * i][3 * j + 2] = true;
                    blocked[3 * i + 1][3 * j + 1] = true;
                    blocked[3 * i + 2][3 * j] = true;
                } else if (ch == '\\') {
                    blocked[3 * i][3 * j] = true;
                    blocked[3 * i + 1][3 * j + 1] = true;
                    blocked[3 * i + 2][3 * j + 2] = true;
                }
            }
        }
        // One flood fill per unvisited open pixel; each fill claims exactly
        // one region, so the number of fills is the answer.
        boolean[][] seen = new boolean[size][size];
        int[] stack = new int[size * size];
        int[] dr = { -1, 1, 0, 0 };
        int[] dc = { 0, 0, -1, 1 };
        int regions = 0;
        for (int r = 0; r < size; ++r) {
            for (int c = 0; c < size; ++c) {
                if (blocked[r][c] || seen[r][c]) {
                    continue;
                }
                ++regions;
                seen[r][c] = true;
                int top = 0;
                stack[top++] = r * size + c;
                while (top > 0) {
                    int cell = stack[--top];
                    int cr = cell / size;
                    int cc = cell % size;
                    for (int d = 0; d < 4; ++d) {
                        int nr = cr + dr[d];
                        int nc = cc + dc[d];
                        if (nr >= 0 && nr < size && nc >= 0 && nc < size && !blocked[nr][nc] && !seen[nr][nc]) {
                            seen[nr][nc] = true;
                            stack[top++] = nr * size + nc;
                        }
                    }
                }
            }
        }
        return regions;
    }
}
