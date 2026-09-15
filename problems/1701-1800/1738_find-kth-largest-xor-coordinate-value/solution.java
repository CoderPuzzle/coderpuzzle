import java.util.Arrays;

class Solution {

    public int kthLargestValue(int[][] matrix, int k) {
        // A coordinate value is the XOR of the upper-left submatrix ending
        // there, and XOR cancels itself: prefix[a][b] = matrix[a][b]
        // ^ prefix[a-1][b] ^ prefix[a][b-1] ^ prefix[a-1][b-1]. Sweeping row
        // by row, the running XOR of the current row folded with the
        // previous prefix row yields the new row in O(n) space; collect all
        // m * n values, sort, and the kth largest sits k from the end.
        int n = matrix[0].length;
        int[] above = new int[n];
        int[] values = new int[matrix.length * n];
        int size = 0;
        for (int[] row : matrix) {
            int left = 0;
            int[] current = new int[n];
            for (int j = 0; j < n; ++j) {
                left ^= row[j];
                current[j] = left ^ above[j];
                values[size++] = current[j];
            }
            above = current;
        }

        Arrays.sort(values);
        return values[values.length - k];
    }
}
