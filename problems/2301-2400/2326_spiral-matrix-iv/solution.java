import java.util.Arrays;

class Solution {

    public int[][] spiralMatrix(int m, int n, ListNode head) {
        // The -1 fill doubles as the unvisited marker. A cursor advances along
        // the clockwise right/down/left/up cycle and rotates 90 degrees whenever
        // the candidate cell leaves the grid or was already written; it stops
        // when the list runs out, leaving every unwritten cell at -1.
        int[][] matrix = new int[m][n];
        for (int[] row : matrix) {
            Arrays.fill(row, -1);
        }
        int[][] directions = { { 0, 1 }, { 1, 0 }, { 0, -1 }, { -1, 0 } };
        int row = 0;
        int column = 0;
        int direction = 0;
        ListNode node = head;
        while (node != null) {
            matrix[row][column] = node.val;
            node = node.next;
            if (node == null) {
                break;
            }
            int nextRow = row + directions[direction][0];
            int nextColumn = column + directions[direction][1];
            if (nextRow < 0 || nextRow >= m || nextColumn < 0 || nextColumn >= n || matrix[nextRow][nextColumn] != -1) {
                direction = (direction + 1) % 4;
                nextRow = row + directions[direction][0];
                nextColumn = column + directions[direction][1];
            }
            row = nextRow;
            column = nextColumn;
        }
        return matrix;
    }
}
