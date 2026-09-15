import java.util.HashMap;
import java.util.Map;

class Solution {

    public int[] findPattern(int[][] board, String[] pattern) {
        // Corners are scanned row-major, so the first hit already
        // carries the lowest row and then the lowest column. Each
        // candidate is validated by one pass that grows a
        // letter->digit bijection: a letter must repeat its own
        // digit, and a digit already claimed by one letter is
        // refused for every other letter.
        int rows = board.length;
        int cols = board[0].length;
        int pRows = pattern.length;
        int pCols = pattern[0].length();
        for (int r = 0; r + pRows <= rows; r++) {
            for (int c = 0; c + pCols <= cols; c++) {
                if (matches(board, pattern, r, c)) {
                    return new int[] { r, c };
                }
            }
        }
        return new int[] { -1, -1 };
    }

    private boolean matches(int[][] board, String[] pattern, int r, int c) {
        Map<Character, Integer> toDigit = new HashMap<>();
        Map<Integer, Character> toLetter = new HashMap<>();
        for (int i = 0; i < pattern.length; i++) {
            for (int j = 0; j < pattern[i].length(); j++) {
                int value = board[r + i][c + j];
                char ch = pattern[i].charAt(j);
                if (Character.isDigit(ch)) {
                    if (value != ch - '0') {
                        return false;
                    }
                } else if (toDigit.containsKey(ch)) {
                    if (toDigit.get(ch) != value) {
                        return false;
                    }
                } else if (toLetter.containsKey(value)) {
                    return false;
                } else {
                    toDigit.put(ch, value);
                    toLetter.put(value, ch);
                }
            }
        }
        return true;
    }
}
