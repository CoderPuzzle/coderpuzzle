import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public int[][] verticalOrder(TreeNode root) {
        if (root == null) {
            return new int[0][];
        }
        // (node, column) pairs advance level by level: dequeue order is
        // top-to-bottom, and within a row left-to-right — exactly the
        // ordering the answer needs, so appending as we dequeue is enough.
        Map<Integer, List<Integer>> columns = new HashMap<>();
        Deque<TreeNode> nodes = new ArrayDeque<>();
        Deque<Integer> indices = new ArrayDeque<>();
        nodes.add(root);
        indices.add(0);
        int leftmost = 0;
        int rightmost = 0;
        while (!nodes.isEmpty()) {
            TreeNode node = nodes.poll();
            int column = indices.poll();
            columns.computeIfAbsent(column, k -> new ArrayList<>()).add(node.val);
            leftmost = Math.min(leftmost, column);
            rightmost = Math.max(rightmost, column);
            if (node.left != null) {
                nodes.add(node.left);
                indices.add(column - 1);
            }
            if (node.right != null) {
                nodes.add(node.right);
                indices.add(column + 1);
            }
        }
        // The visited columns form one contiguous range (columns only ever
        // move by one), so the minimum-to-maximum sweep misses nothing.
        int[][] out = new int[rightmost - leftmost + 1][];
        for (int column = leftmost; column <= rightmost; column++) {
            List<Integer> values = columns.get(column);
            int[] columnValues = new int[values.size()];
            for (int i = 0; i < values.size(); i++) {
                columnValues[i] = values.get(i);
            }
            out[column - leftmost] = columnValues;
        }
        return out;
    }
}
