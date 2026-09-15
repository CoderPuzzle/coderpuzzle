class Solution {

    public int totalDistance(String s) {
        // The keyboard is three ragged rows — qwertyuiop, asdfghjkl,
        // zxcvbnm — so recording each letter's (row, col) cell once turns
        // the answer into a running Manhattan sum: the finger starts on
        // 'a', and each typed letter adds |r1 - r2| + |c1 - c2| for the
        // move from the previous key.
        int[] row = new int[26];
        int[] col = new int[26];
        String[] rows = { "qwertyuiop", "asdfghjkl", "zxcvbnm" };
        for (int r = 0; r < rows.length; r++) {
            for (int c = 0; c < rows[r].length(); c++) {
                row[rows[r].charAt(c) - 'a'] = r;
                col[rows[r].charAt(c) - 'a'] = c;
            }
        }
        int total = 0;
        int pr = row[0];
        int pc = col[0];
        for (int i = 0; i < s.length(); i++) {
            int idx = s.charAt(i) - 'a';
            total += Math.abs(pr - row[idx]) + Math.abs(pc - col[idx]);
            pr = row[idx];
            pc = col[idx];
        }
        return total;
    }
}
