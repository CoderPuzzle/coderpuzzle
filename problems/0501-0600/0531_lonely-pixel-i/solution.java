class Solution {

    public int findLonelyPixel(String[][] picture) {
        // A pixel is lonely exactly when it is the only 'B' in its row and
        // the only 'B' in its column. One pass tallies both totals per row
        // and per column; a second pass checks each 'B' against them.
        int m = picture.length;
        int n = picture[0].length;
        int[] rowCount = new int[m];
        int[] colCount = new int[n];
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (picture[i][j].equals("B")) {
                    rowCount[i]++;
                    colCount[j]++;
                }
            }
        }
        int lonely = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (picture[i][j].equals("B") && rowCount[i] == 1 && colCount[j] == 1) {
                    lonely++;
                }
            }
        }
        return lonely;
    }
}
