import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[][] levelOrder(TreeNode root) {
        // One list per depth, appended to the first time the walk reaches
        // that depth; afterwards it already exists for every later arrival.
        List<List<Integer>> grouped = new ArrayList<>();
        visit(root, 0, grouped);
        int[][] out = new int[grouped.size()][];
        for (int i = 0; i < grouped.size(); i++) {
            List<Integer> level = grouped.get(i);
            int[] row = new int[level.size()];
            for (int j = 0; j < level.size(); j++) {
                row[j] = level.get(j);
            }
            out[i] = row;
        }
        return out;
    }

    // Pre-order: record the value before descending, so arrivals at each
    // depth happen left to right.
    private void visit(TreeNode node, int depth, List<List<Integer>> grouped) {
        if (node == null) {
            return;
        }
        if (grouped.size() == depth) {
            grouped.add(new ArrayList<>());
        }
        grouped.get(depth).add(node.val);
        visit(node.left, depth + 1, grouped);
        visit(node.right, depth + 1, grouped);
    }
}
