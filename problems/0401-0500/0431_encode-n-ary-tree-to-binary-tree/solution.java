import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashMap;
import java.util.Map;

class Solution {

    public TreeNode encode(Node root) {
        if (root == null) return null;
        Map<Node, TreeNode> shells = new HashMap<>();
        shells.put(root, new TreeNode(root.val));
        Deque<Node> queue = new ArrayDeque<>();
        queue.add(root);
        while (!queue.isEmpty()) {
            Node node = queue.poll();
            TreeNode bnode = shells.get(node);
            TreeNode prev = null;
            for (Node child : node.children) {
                TreeNode bchild = new TreeNode(child.val);
                shells.put(child, bchild);
                if (prev == null) {
                    bnode.left = bchild;
                } else {
                    prev.right = bchild;
                }
                prev = bchild;
                queue.add(child);
            }
        }
        return shells.get(root);
    }
}
