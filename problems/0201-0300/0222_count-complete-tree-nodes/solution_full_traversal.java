import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public int countNodes(TreeNode root) {
        // Count every node the plain way: run down each left spine, then
        // pop back for the right turns. The stack holds one node per level.
        int count = 0;
        Deque<TreeNode> stack = new ArrayDeque<>();
        TreeNode node = root;
        while (node != null || !stack.isEmpty()) {
            while (node != null) {
                count += 1;
                stack.push(node);
                node = node.left;
            }
            node = stack.pop().right;
        }
        return count;
    }
}
