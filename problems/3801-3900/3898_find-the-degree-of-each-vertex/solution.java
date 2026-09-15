class Solution {

    public int[] findDegrees(int[][] matrix) {
        int[] degrees = new int[matrix.length];
        for (int vertex = 0; vertex < matrix.length; vertex++) {
            for (int edge : matrix[vertex]) {
                degrees[vertex] += edge;
            }
        }
        return degrees;
    }
}
