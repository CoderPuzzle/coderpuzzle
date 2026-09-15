class Solution {

    public boolean checkValid(int[][] matrix) {
        int size = matrix.length;
        for (int index = 0; index < size; index++) {
            boolean[] rowSeen = new boolean[size + 1];
            boolean[] colSeen = new boolean[size + 1];
            for (int offset = 0; offset < size; offset++) {
                int rowValue = matrix[index][offset];
                int colValue = matrix[offset][index];
                if (rowSeen[rowValue] || colSeen[colValue]) {
                    return false;
                }
                rowSeen[rowValue] = true;
                colSeen[colValue] = true;
            }
        }
        return true;
    }
}
