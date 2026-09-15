class Solution {

    public int[] findMissingAndRepeatedValues(int[][] grid) {
        // The grid holds [1, n*n] once each except one value twice and one
        // value never: flag each value in a seen array during one pass, and
        // a re-flagged value is the repeated a; the lone unflagged slot
        // afterward is the missing b.
        int n = grid.length;
        boolean[] seen = new boolean[n * n + 1];
        int a = 0;
        for (int[] row : grid) {
            for (int v : row) {
                if (seen[v]) {
                    a = v;
                }
                seen[v] = true;
            }
        }
        int b = 1;
        while (seen[b]) {
            b++;
        }
        return new int[] { a, b };
    }
}
