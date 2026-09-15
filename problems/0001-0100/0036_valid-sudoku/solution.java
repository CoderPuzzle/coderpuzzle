class Solution {

    public boolean isValidSudoku(String[][] board) {
        // One seen table per row, column, and 3x3 box: insert each filled
        // cell's digit into the three units it belongs to, and the first
        // repeat anywhere is the answer.
        boolean[][] rows = new boolean[9][9];
        boolean[][] columns = new boolean[9][9];
        boolean[][] boxes = new boolean[9][9];
        for (int r = 0; r < 9; ++r) {
            for (int c = 0; c < 9; ++c) {
                String cell = board[r][c];
                if (cell.equals(".")) continue;
                int d = cell.charAt(0) - '1';
                // Rows and columns are chunked in threes, so this numbers
                // the 3x3 boxes 0 through 8.
                int b = (r / 3) * 3 + c / 3;
                if (rows[r][d] || columns[c][d] || boxes[b][d]) return false;
                rows[r][d] = true;
                columns[c][d] = true;
                boxes[b][d] = true;
            }
        }
        return true;
    }
}
