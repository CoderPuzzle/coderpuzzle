class Solution {

    public boolean validTicTacToe(String[] board) {
        // Reachability folds into three facts about the final position. X
        // moves first and play strictly alternates, so the counts must
        // satisfy x == o or x == o + 1. The game stops at the first
        // completed line, so at most one player holds a winning row,
        // column, or diagonal — and the winner's decisive placement pins
        // the tally exactly: X's winning move leaves x == o + 1, O's
        // leaves x == o. A board passing all three gates was played; any
        // other board is unreachable.
        String cells = String.join("", board);
        int x = count(cells, 'X');
        int o = count(cells, 'O');
        if (x != o && x != o + 1) {
            return false;
        }
        boolean xwin = wins(cells, 'X');
        boolean owin = wins(cells, 'O');
        if (xwin && owin) {
            return false;
        }
        if (xwin && x != o + 1) {
            return false;
        }
        if (owin && x != o) {
            return false;
        }
        return true;
    }

    private int count(String cells, char player) {
        int total = 0;
        for (int i = 0; i < cells.length(); ++i) {
            if (cells.charAt(i) == player) {
                ++total;
            }
        }
        return total;
    }

    private boolean wins(String cells, char player) {
        int[][] lines = {
            { 0, 1, 2 },
            { 3, 4, 5 },
            { 6, 7, 8 },
            { 0, 3, 6 },
            { 1, 4, 7 },
            { 2, 5, 8 },
            { 0, 4, 8 },
            { 2, 4, 6 },
        };
        for (int[] line : lines) {
            if (cells.charAt(line[0]) == player && cells.charAt(line[1]) == player && cells.charAt(line[2]) == player) {
                return true;
            }
        }
        return false;
    }
}
