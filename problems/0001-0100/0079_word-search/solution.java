class Solution {

    public boolean exist(String[][] board, String word) {
        int rows = board.length,
            cols = board[0].length;
        for (int row = 0; row < rows; ++row) {
            for (int col = 0; col < cols; ++col) {
                if (walk(board, word, row, col, 0)) return true;
            }
        }
        return false;
    }

    // Depth-first walk from one starting cell: every level must supply the
    // next letter and marks its cell so deeper levels cannot step on it twice.
    private boolean walk(String[][] board, String word, int row, int col, int index) {
        String letter = board[row][col];
        if (letter.charAt(0) != word.charAt(index)) return false;
        if (index == word.length() - 1) return true;
        // The board doubles as the visited set: '#' is never a letter.
        board[row][col] = "#";
        int rows = board.length,
            cols = board[0].length;
        boolean found =
            (row > 0 && walk(board, word, row - 1, col, index + 1)) ||
            (row + 1 < rows && walk(board, word, row + 1, col, index + 1)) ||
            (col > 0 && walk(board, word, row, col - 1, index + 1)) ||
            (col + 1 < cols && walk(board, word, row, col + 1, index + 1));
        // Restore on the way out: sibling starts and later cases see the board intact.
        board[row][col] = letter;
        return found;
    }
}
