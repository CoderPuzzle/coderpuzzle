import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    public int[] preorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) return new int[] {};
        // Deque used as a stack: push and pop operate on the same end.
        Deque<TreeNode> stack = new ArrayDeque<>();
        stack.push(root);
        // Loop invariant: `stack` holds exactly the discovered-but-unvisited
        // nodes, in the order preorder wants them next.
        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            // Preorder visits a node before either of its subtrees.
            result.add(node.val);
            // Push right before left: the stack pops from the top, so the
            // left child (and its entire subtree) is traversed first.
            if (node.right != null) stack.push(node.right);
            if (node.left != null) stack.push(node.left);
        }
        int[] out = new int[result.size()];
        for (int i = 0; i < result.size(); i++) {
            out[i] = result.get(i);
        }
        return out;
    }
}
