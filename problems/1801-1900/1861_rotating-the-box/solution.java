class Solution {

    // Gravity first: in each original row stones slide right until an
    // obstacle or the wall. Then a 90-degree clockwise rotation maps
    // new[r][c] to old[m - 1 - c][r].
    public String[][] rotateTheBox(String[][] boxGrid) {
        int m = boxGrid.length,
            n = boxGrid[0].length;
        String[][] rows = new String[m][];
        for (int r = 0; r < m; r++) {
            String[] cells = boxGrid[r].clone();
            int write = n - 1;
            for (int c = n - 1; c >= 0; c--) {
                if (cells[c].equals("*")) {
                    write = c - 1;
                } else if (cells[c].equals("#")) {
                    String t = cells[c];
                    cells[c] = cells[write];
                    cells[write] = t;
                    write--;
                }
            }
            rows[r] = cells;
        }
        String[][] out = new String[n][m];
        for (int r = 0; r < n; r++) {
            for (int c = 0; c < m; c++) {
                out[r][c] = rows[m - 1 - c][r];
            }
        }
        return out;
    }
}
