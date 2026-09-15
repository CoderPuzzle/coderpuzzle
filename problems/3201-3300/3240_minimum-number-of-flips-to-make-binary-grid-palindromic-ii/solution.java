class Solution {

    public int minFlips(int[][] grid) {
        int m = grid.length,
            n = grid[0].length;
        // Reflections in both axes partition the cells into orbits that must
        // end uniform: quadrant quadruples, pairs along the middle row/column
        // of odd dimensions, and the lone center when both are odd. Price
        // each orbit at its cheaper value first.
        int cost = 0;
        for (int i = 0; i < m / 2; ++i) {
            for (int j = 0; j < n / 2; ++j) {
                int ones = grid[i][j] + grid[i][n - 1 - j] + grid[m - 1 - i][j] + grid[m - 1 - i][n - 1 - j];
                cost += Math.min(ones, 4 - ones);
            }
        }
        int splits = 0,
            uniforms = 0;
        if (m % 2 == 1) {
            for (int j = 0; j < n / 2; ++j) {
                int ones = grid[m / 2][j] + grid[m / 2][n - 1 - j];
                cost += Math.min(ones, 2 - ones);
                if (ones == 1) ++splits;
                else if (ones == 2) ++uniforms;
            }
        }
        if (n % 2 == 1) {
            for (int i = 0; i < m / 2; ++i) {
                int ones = grid[i][n / 2] + grid[m - 1 - i][n / 2];
                cost += Math.min(ones, 2 - ones);
                if (ones == 1) ++splits;
                else if (ones == 2) ++uniforms;
            }
        }
        // Divisibility reads only the small orbits: a quadruple holds a
        // multiple of four 1s either way, a finished pair holds two, the
        // center one. So 2t + z must be 0 mod 4 — the center can never sit
        // at 1 (2t + 1 is odd) and clears for its own price, and the pairs
        // parked at 1 must be even in number. A split pair re-tunes between
        // equal-cost states for free; otherwise one uniform pair pays 2 to
        // switch to its dearer value.
        if (m % 2 == 1 && n % 2 == 1) cost += grid[m / 2][n / 2];
        if (splits == 0 && uniforms % 2 == 1) cost += 2;
        return cost;
    }
}
