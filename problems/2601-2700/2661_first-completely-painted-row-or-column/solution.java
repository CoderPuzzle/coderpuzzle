class Solution {

    public int firstCompleteIndex(int[] arr, int[][] mat) {
        // Precompute where every value lives, then replay arr bumping each
        // cell's row and column counter; a counter reaching its width or
        // height means that line just finished painting.
        int rows = mat.length;
        int columns = mat[0].length;
        int[] rowOf = new int[rows * columns + 1];
        int[] columnOf = new int[rows * columns + 1];
        for (int r = 0; r < rows; ++r) {
            for (int c = 0; c < columns; ++c) {
                rowOf[mat[r][c]] = r;
                columnOf[mat[r][c]] = c;
            }
        }
        int[] rowFill = new int[rows];
        int[] columnFill = new int[columns];
        for (int index = 0; index < arr.length; ++index) {
            int value = arr[index];
            if (++rowFill[rowOf[value]] == columns) {
                return index;
            }
            if (++columnFill[columnOf[value]] == rows) {
                return index;
            }
        }
        return -1;
    }
}
