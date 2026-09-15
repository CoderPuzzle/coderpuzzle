import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Deque;
import java.util.List;

class Solution {

    public int[] postorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) {
            return new int[] {};
        }
        // Deque used as a stack: push and pop operate on the same end.
        Deque<TreeNode> stack = new ArrayDeque<>();
        stack.push(root);
        // Loop invariant: `stack` holds nodes still to be expanded; each is
        // emitted the moment it is popped. Children are pushed left first,
        // so the right child is always expanded before the left one.
        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            result.add(node.val);
            // Left first, right on top: the emits so far read root, right,
            // left — preorder with the two children swapped.
            if (node.left != null) {
                stack.push(node.left);
            }
            if (node.right != null) {
                stack.push(node.right);
            }
        }
        // Root-right-left read backwards is left-right-root: postorder.
        Collections.reverse(result);
        int[] out = new int[result.size()];
        for (int i = 0; i < result.size(); i++) {
            out[i] = result.get(i);
        }
        return out;
    }
}
