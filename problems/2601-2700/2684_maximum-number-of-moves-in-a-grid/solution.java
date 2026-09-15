class Solution {

    public int maxMoves(int[][] grid) {
        int rows = grid.length;
        int columns = grid[0].length;
        boolean[] reachable = new boolean[rows];
        for (int row = 0; row < rows; row++) {
            reachable[row] = true;
        }
        int moves = 0;
        for (int column = 0; column + 1 < columns; column++) {
            boolean[] next = new boolean[rows];
            int reached = 0;
            for (int row = 0; row < rows; row++) {
                if (!reachable[row]) {
                    continue;
                }
                int value = grid[row][column];
                for (int target = Math.max(0, row - 1); target < Math.min(rows, row + 2); target++) {
                    if (!next[target] && grid[target][column + 1] > value) {
                        next[target] = true;
                        reached++;
                    }
                }
            }
            if (reached == 0) {
                break;
            }
            reachable = next;
            moves++;
        }
        return moves;
    }
}
