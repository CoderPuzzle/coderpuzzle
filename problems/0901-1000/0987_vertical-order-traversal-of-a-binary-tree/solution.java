import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public int[][] verticalTraversal(TreeNode root) {
        // One (column, row, value) record per node, gathered by an
        // explicit-stack DFS — no recursion, so a 1000-node chain cannot
        // exhaust any call stack.
        Map<Integer, List<int[]>> cells = new HashMap<>();
        Deque<Frame> pending = new ArrayDeque<>();
        if (root != null) {
            pending.push(new Frame(root, 0, 0));
        }
        int leftmost = 0;
        int rightmost = 0;
        while (!pending.isEmpty()) {
            Frame frame = pending.pop();
            TreeNode node = frame.node;
            cells.computeIfAbsent(frame.col, key -> new ArrayList<>()).add(new int[] { frame.row, node.val });
            leftmost = Math.min(leftmost, frame.col);
            rightmost = Math.max(rightmost, frame.col);
            if (node.right != null) pending.push(new Frame(node.right, frame.row + 1, frame.col + 1));
            if (node.left != null) pending.push(new Frame(node.left, frame.row + 1, frame.col - 1));
        }
        // Rows read top to bottom and values break the ties of nodes sharing
        // one cell. The visited columns form one contiguous range (columns
        // only ever move by one), so the minimum-to-maximum sweep misses
        // nothing.
        int[][] answer = new int[rightmost - leftmost + 1][];
        for (int column = leftmost; column <= rightmost; ++column) {
            List<int[]> records = cells.get(column);
            records.sort((a, b) -> a[0] != b[0] ? Integer.compare(a[0], b[0]) : Integer.compare(a[1], b[1]));
            int[] values = new int[records.size()];
            for (int index = 0; index < values.length; ++index) {
                values[index] = records.get(index)[1];
            }
            answer[column - leftmost] = values;
        }
        return answer;
    }

    // A pending (node, row, column) step of the depth-first walk.
    private static final class Frame {

        final TreeNode node;
        final int row;
        final int col;

        Frame(TreeNode node, int row, int col) {
            this.node = node;
            this.row = row;
            this.col = col;
        }
    }
}
