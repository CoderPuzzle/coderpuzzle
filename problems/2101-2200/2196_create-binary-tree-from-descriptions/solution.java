import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

class Solution {

    public TreeNode createBinaryTree(int[][] descriptions) {
        Map<Integer, TreeNode> nodes = new HashMap<>();
        Set<Integer> children = new HashSet<>();
        for (int[] d : descriptions) {
            nodes.computeIfAbsent(d[0], TreeNode::new);
            children.add(d[1]);
            TreeNode parent = nodes.get(d[0]);
            if (d[2] == 1) {
                parent.left = nodes.computeIfAbsent(d[1], TreeNode::new);
            } else {
                parent.right = nodes.computeIfAbsent(d[1], TreeNode::new);
            }
        }
        for (Map.Entry<Integer, TreeNode> entry : nodes.entrySet()) {
            if (!children.contains(entry.getKey())) {
                return entry.getValue();
            }
        }
        return null;
    }
}
