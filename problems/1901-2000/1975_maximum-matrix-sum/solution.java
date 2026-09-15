class Solution {

    public long maxMatrixSum(int[][] matrix) {
        // Each operation flips two border-adjacent cells, so the parity of
        // the negative count is invariant: an even count makes every value
        // positive, an odd count must leave the smallest-magnitude value
        // negative. Accumulate in long: 250^2 * 1e5 = 6.25e9 > 2^31.
        long total = 0;
        int negatives = 0;
        int smallest = Integer.MAX_VALUE;
        for (int[] row : matrix) {
            for (int value : row) {
                total += Math.abs(value);
                if (value < 0) ++negatives;
                smallest = Math.min(smallest, Math.abs(value));
            }
        }
        if (negatives % 2 == 1) total -= 2L * smallest;
        return total;
    }
}
