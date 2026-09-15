class Solution {

    public int smallestCommonElement(int[][] mat) {
        int[] tally = new int[10001];
        for (int[] row : mat) {
            for (int value : row) {
                tally[value]++;
            }
        }
        for (int value = 1; value <= 10000; value++) {
            if (tally[value] == mat.length) {
                // Strictly increasing rows never repeat a value, so only a
                // value present in every row can reach count m.
                return value;
            }
        }
        return -1;
    }
}
