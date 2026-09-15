import java.util.Arrays;

class Solution {

    public int matrixSum(int[][] nums) {
        // Operation k removes the largest remaining number of every row, so
        // with each row sorted ascending the k-th column from the end holds
        // exactly what that row gives up in operation k — the score is the
        // sum of the column maxima, with already-emptied rows skipped.
        int width = 0;
        for (int[] row : nums) {
            Arrays.sort(row);
            width = Math.max(width, row.length);
        }
        int score = 0;
        for (int column = 0; column < width; column++) {
            int best = Integer.MIN_VALUE;
            for (int[] row : nums) {
                int index = row.length - 1 - column;
                if (index >= 0 && row[index] > best) {
                    best = row[index];
                }
            }
            score += best;
        }
        return score;
    }
}
