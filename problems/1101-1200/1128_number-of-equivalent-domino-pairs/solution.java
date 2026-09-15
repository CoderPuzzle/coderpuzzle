class Solution {

    public int numEquivDominoPairs(int[][] dominoes) {
        // Canonical orientation (min, max) collapses a domino and its
        // rotation to one cell of a 9x9 table.
        int[][] table = new int[10][10];
        long pairs = 0;
        for (int[] domino : dominoes) {
            int lo = Math.min(domino[0], domino[1]);
            int hi = Math.max(domino[0], domino[1]);
            // Every earlier domino in this cell pairs with the current one.
            pairs += table[lo][hi];
            table[lo][hi]++;
        }
        return (int) pairs;
    }
}
