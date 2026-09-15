import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

class Solution {

    public TreeNode subtreeWithAllDeepest(TreeNode root) {
        if (root == null) {
            return null;
        }
        // A node can only be judged once both of its children's heights
        // are known, so the walk is post-order — children before the node.
        // The stack revisits every node: the first visit schedules the
        // node's own merge beneath its two children — so it fires only
        // once both subtrees are measured — and the second performs it.
        // Iterating keeps a 500-node chain's ~500 merges off the thread
        // stack rather than trusting any runtime's frame budget.
        Map<TreeNode, Integer> heights = new HashMap<>();
        Map<TreeNode, TreeNode> smallest = new HashMap<>();
        Set<TreeNode> measured = new HashSet<>();
        Deque<TreeNode> stack = new ArrayDeque<>();
        stack.push(root);
        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            if (measured.add(node)) {
                // First visit: the merge surfaces after both children —
                // pushed last, they are measured first.
                stack.push(node);
                if (node.right != null) {
                    stack.push(node.right);
                }
                if (node.left != null) {
                    stack.push(node.left);
                }
                continue;
            }
            int lh = node.left == null ? 0 : heights.get(node.left);
            int rh = node.right == null ? 0 : heights.get(node.right);
            heights.put(node, 1 + Math.max(lh, rh));
            // Equal heights: each side reaches this subtree's deepest
            // level, so its deepest nodes sit on both sides and only this
            // node covers them all — it is the subtree's answer. Unequal:
            // no deepest node can live in the shallower side, so the
            // deeper side's answer passes through unchanged.
            if (lh == rh) {
                smallest.put(node, node);
            } else {
                smallest.put(node, smallest.get(lh > rh ? node.left : node.right));
            }
        }
        return smallest.get(root);
    }
}
