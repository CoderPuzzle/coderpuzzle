import java.util.Arrays;

class Solution {

    public int[][] sortTheStudents(int[][] score, int k) {
        // Sort the rows by their column-k entry, largest first:
        // extracting a comparison key is O(1) row indexing. Scores are
        // pairwise distinct across the whole matrix, so ties never occur
        // and the descending order is unique.
        Arrays.sort(score, (a, b) -> b[k] - a[k]);
        return score;
    }
}
