import java.util.ArrayList;
import java.util.List;

class Solution {

    public TreeNode reverseOddLevels(TreeNode root) {
        // Only values move — children stay attached — so reversing an odd
        // level means writing its value list back mirrored: first position
        // takes the last value, and so on inward. A frontier of nodes starts
        // at the root and steps down one level per round, mirroring each odd
        // level's values on arrival. The tree is perfect, so one null check
        // per node pair keeps the frontier free of nulls past the last level.
        List<TreeNode> row = new ArrayList<>();
        row.add(root);
        int depth = 0;
        while (!row.isEmpty()) {
            if (depth % 2 == 1) {
                int[] values = new int[row.size()];
                for (int index = 0; index < values.length; ++index) {
                    values[index] = row.get(index).val;
                }
                for (int index = 0; index < values.length; ++index) {
                    row.get(index).val = values[values.length - 1 - index];
                }
            }
            List<TreeNode> next = new ArrayList<>();
            for (TreeNode node : row) {
                if (node.left != null) {
                    next.add(node.left);
                    next.add(node.right);
                }
            }
            row = next;
            depth += 1;
        }
        return root;
    }
}
