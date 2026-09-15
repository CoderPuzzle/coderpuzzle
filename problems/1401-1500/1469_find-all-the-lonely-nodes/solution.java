import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    public int[] getLonelyNodes(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) {
            return new int[0];
        }
        // Explicit stack: a 1000-deep chain must not recurse.
        Deque<TreeNode> stack = new ArrayDeque<>();
        stack.push(root);
        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            if (node.left != null && node.right == null) {
                result.add(node.left.val);
            } else if (node.right != null && node.left == null) {
                result.add(node.right.val);
            }
            if (node.left != null) {
                stack.push(node.left);
            }
            if (node.right != null) {
                stack.push(node.right);
            }
        }
        int[] answer = new int[result.size()];
        for (int i = 0; i < result.size(); i++) {
            answer[i] = result.get(i);
        }
        return answer;
    }
}
