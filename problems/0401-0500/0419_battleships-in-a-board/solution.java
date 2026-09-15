class Solution {

    public int countBattleships(String[][] board) {
        // Battleships are straight horizontal or vertical runs of 'X', and
        // no two ships touch, so each ship has exactly one cell with no 'X'
        // above it and no 'X' to its left: its head, the first of its cells
        // in reading order. Counting heads counts ships.
        int m = board.length;
        int n = board[0].length;
        int count = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (!board[i][j].equals("X")) continue;
                if (i > 0 && board[i - 1][j].equals("X")) continue;
                if (j > 0 && board[i][j - 1].equals("X")) continue;
                count++;
            }
        }
        return count;
    }
}
