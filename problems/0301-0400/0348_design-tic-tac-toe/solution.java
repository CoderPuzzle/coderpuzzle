class TicTacToe {

    // One counter per line: rows/cols carry each player's mark count on
    // every line, plus one counter per diagonal — a counter reaching n
    // means the player owns the whole line, so no board is stored.
    private final int n;
    private final int[][] rows;
    private final int[][] cols;
    private final int[] diagonal = new int[3];
    private final int[] antiDiagonal = new int[3];

    public TicTacToe(int n) {
        // Index 0 stays unused so the player ids 1 and 2 address their
        // own counter rows directly.
        this.n = n;
        rows = new int[3][n];
        cols = new int[3][n];
    }

    public int move(int row, int col, int player) {
        // Only the lines through the played square can complete on this
        // move, so the counters just bumped decide the winner.
        rows[player][row]++;
        cols[player][col]++;
        if (row == col) {
            diagonal[player]++;
        }
        if (row + col == n - 1) {
            antiDiagonal[player]++;
        }
        if (rows[player][row] == n || cols[player][col] == n || diagonal[player] == n || antiDiagonal[player] == n) {
            return player;
        }
        return 0;
    }
}
