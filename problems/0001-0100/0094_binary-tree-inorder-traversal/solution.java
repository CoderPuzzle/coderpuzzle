import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    public int[] inorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        // Deque used as a stack: push and pop operate on the same end.
        Deque<TreeNode> stack = new ArrayDeque<>();
        TreeNode node = root;
        // Loop invariant: `stack` holds the ancestors whose left subtrees
        // are still being descended into; `node` is the next subtree to
        // process (null means it is time to pop back up instead).
        while (node != null || !stack.isEmpty()) {
            // Descend the left spine, remembering every node on it.
            while (node != null) {
                stack.push(node);
                node = node.left;
            }
            // The stack top is now the leftmost unvisited node of the
            // current subtree — the next value in inorder order.
            node = stack.pop();
            result.add(node.val);
            // The popped node's left subtree is done; traverse its right
            // subtree in full before any ancestor below it is visited.
            node = node.right;
        }
        int[] out = new int[result.size()];
        for (int i = 0; i < result.size(); i++) {
            out[i] = result.get(i);
        }
        return out;
    }
}
