class Solution {

    public int[][] reconstructMatrix(int upper, int lower, int[] colsum) {
        int n = colsum.length;
        int twos = 0,
            ones = 0;
        for (int s : colsum) {
            if (s == 2) ++twos;
            else if (s == 1) ++ones;
        }
        // Every 2 spends one from each row; the top row cannot exceed its cap.
        if (2 * twos + ones != upper + lower || upper < twos || upper > twos + ones) {
            return new int[0][];
        }
        // First (upper - twos) free columns go on top; nothing else is chosen.
        int freeTop = upper - twos;
        int[] top = new int[n];
        int[] bottom = new int[n];
        for (int i = 0; i < n; ++i) {
            if (colsum[i] == 2) {
                top[i] = bottom[i] = 1;
            } else if (colsum[i] == 1) {
                if (freeTop > 0) {
                    top[i] = 1;
                    --freeTop;
                } else {
                    bottom[i] = 1;
                }
            }
        }
        return new int[][] { top, bottom };
    }
}
