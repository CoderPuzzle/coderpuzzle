class Solution {

    private String[][] board;
    private String word;

    public boolean placeWordInCrossword(String[][] board, String word) {
        this.board = board;
        this.word = word;
        int rows = board.length;
        int columns = board[0].length;

        for (int row = 0; row < rows; ++row) {
            int start = 0;
            for (int end = 0; end <= columns; ++end) {
                if (end == columns || board[row][end].equals("#")) {
                    if (matches(row, start, 0, 1, end - start)) return true;
                    start = end + 1;
                }
            }
        }

        for (int column = 0; column < columns; ++column) {
            int start = 0;
            for (int end = 0; end <= rows; ++end) {
                if (end == rows || board[end][column].equals("#")) {
                    if (matches(start, column, 1, 0, end - start)) return true;
                    start = end + 1;
                }
            }
        }

        return false;
    }

    private boolean matches(int row, int column, int rowStep, int columnStep, int length) {
        if (length != word.length()) return false;
        boolean forward = true;
        boolean backward = true;
        for (int offset = 0; offset < length; ++offset) {
            char cell = board[row + rowStep * offset][column + columnStep * offset].charAt(0);
            if (cell != ' ') {
                forward &= cell == word.charAt(offset);
                backward &= cell == word.charAt(length - 1 - offset);
            }
        }
        return forward || backward;
    }
}
