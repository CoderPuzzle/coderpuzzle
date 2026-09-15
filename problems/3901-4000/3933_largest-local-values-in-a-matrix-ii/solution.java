class Solution {

    public int countLocalMaximums(int[][] matrix) {
        int rows = matrix.length;
        int columns = matrix[0].length;
        java.util.List<int[]>[] positions = new java.util.ArrayList[201];
        for (int value = 0; value <= 200; value++) positions[value] = new java.util.ArrayList<>();
        for (int row = 0; row < rows; row++) {
            for (int column = 0; column < columns; column++) {
                if (matrix[row][column] != 0) positions[matrix[row][column]].add(new int[] { row, column });
            }
        }

        int answer = 0;
        for (int value = 1; value <= 200; value++) {
            if (positions[value].isEmpty()) continue;
            int[][] prefix = new int[rows + 1][columns + 1];
            for (int row = 0; row < rows; row++) {
                int running = 0;
                for (int column = 0; column < columns; column++) {
                    if (matrix[row][column] > value) running++;
                    prefix[row + 1][column + 1] = prefix[row][column + 1] + running;
                }
            }
            for (int[] position : positions[value]) {
                int row = position[0],
                    column = position[1];
                int top = Math.max(0, row - value);
                int bottom = Math.min(rows - 1, row + value);
                int left = Math.max(0, column - value);
                int right = Math.min(columns - 1, column + value);
                int greater =
                    prefix[bottom + 1][right + 1] -
                    prefix[top][right + 1] -
                    prefix[bottom + 1][left] +
                    prefix[top][left];
                int[] cornerRows = { row - value, row + value };
                int[] cornerColumns = { column - value, column + value };
                for (int cornerRow : cornerRows) {
                    for (int cornerColumn : cornerColumns) {
                        if (
                            cornerRow >= 0 &&
                            cornerRow < rows &&
                            cornerColumn >= 0 &&
                            cornerColumn < columns &&
                            matrix[cornerRow][cornerColumn] > value
                        ) greater--;
                    }
                }
                if (greater == 0) answer++;
            }
        }
        return answer;
    }
}
