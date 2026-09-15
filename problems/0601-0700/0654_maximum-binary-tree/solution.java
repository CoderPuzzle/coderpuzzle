import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public TreeNode constructMaximumBinaryTree(int[] nums) {
        // The half-built tree's right spine holds exactly the still-open
        // maxima — values strictly decreasing from the root down — so it
        // lives on a stack. A new value dominates every smaller top: each
        // popped subtree is finished and can only hang left of it, and the
        // last one out (the run's largest) is its left child.
        Deque<TreeNode> stack = new ArrayDeque<>();
        for (int value : nums) {
            TreeNode node = new TreeNode(value);
            TreeNode last = null;
            while (!stack.isEmpty() && stack.peek().val < value) {
                last = stack.pop();
            }
            node.left = last;
            if (!stack.isEmpty()) {
                // Whatever survives is larger, so the new node is its right
                // child — this link is rewritten only after the previous
                // child was popped and re-hung one level down.
                stack.peek().right = node;
            }
            stack.push(node);
        }
        // The bottom of the stack is the largest value ever seen: the root.
        return stack.peekLast();
    }
}
