import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[] spiralOrder(int[][] matrix) {
        // Boundary-shrinking walk: emit the ring of the matrix that is left —
        // top row, right column, bottom row, left column — then shrink every
        // boundary inward by one and repeat until every element is emitted.
        int rows = matrix.length,
            columns = matrix[0].length;
        int top = 0,
            bottom = rows - 1,
            left = 0,
            right = columns - 1;
        List<Integer> order = new ArrayList<>();
        while (order.size() < rows * columns) {
            for (int column = left; column <= right; ++column) {
                order.add(matrix[top][column]);
            }
            for (int row = top + 1; row <= bottom; ++row) {
                order.add(matrix[row][right]);
            }
            if (top != bottom) {
                // Leftwards along the bottom row, stopping before the corner
                // the right-column run already emitted.
                for (int column = right - 1; column >= left; --column) {
                    order.add(matrix[bottom][column]);
                }
            }
            if (left != right) {
                // Upwards along the left column, stopping before the corner
                // the top-row run already emitted.
                for (int row = bottom - 1; row > top; --row) {
                    order.add(matrix[row][left]);
                }
            }
            ++top;
            --bottom;
            ++left;
            --right;
        }
        int[] result = new int[order.size()];
        for (int index = 0; index < result.length; ++index) {
            result[index] = order.get(index);
        }
        return result;
    }
}
