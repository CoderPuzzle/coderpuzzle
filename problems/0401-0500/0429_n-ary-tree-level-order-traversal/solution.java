import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[][] levelOrder(Node root) {
        List<int[]> levels = new ArrayList<>();
        if (root != null) {
            List<Node> level = new ArrayList<>();
            level.add(root);
            while (!level.isEmpty()) {
                int[] values = new int[level.size()];
                List<Node> next = new ArrayList<>();
                for (int index = 0; index < level.size(); index++) {
                    Node node = level.get(index);
                    values[index] = node.val;
                    next.addAll(node.children);
                }
                levels.add(values);
                level = next;
            }
        }
        return levels.toArray(new int[0][]);
    }
}
