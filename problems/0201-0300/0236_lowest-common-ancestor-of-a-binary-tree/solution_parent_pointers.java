import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

class Solution {

    public int lowestCommonAncestor(TreeNode root, int p, int q) {
        // One walk over the tree records every node's parent. Values are
        // unique, so a value identifies its node; the root records none.
        Map<Integer, Integer> parent = new HashMap<>();
        Deque<TreeNode> stack = new ArrayDeque<>();
        stack.push(root);
        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            for (TreeNode child : new TreeNode[] { node.left, node.right }) {
                if (child != null) {
                    parent.put(child.val, node.val);
                    stack.push(child);
                }
            }
        }
        // Every node on the root-to-p chain, p and root included, is a
        // shared ancestor candidate: it is an ancestor of p by construction.
        Set<Integer> ancestors = new HashSet<>();
        int value = p;
        while (true) {
            ancestors.add(value);
            if (value == root.val) {
                break;
            }
            value = parent.get(value);
        }
        // Climb from q: the first candidate met is the deepest node whose
        // subtree covers both targets.
        value = q;
        while (!ancestors.contains(value)) {
            value = parent.get(value);
        }
        return value;
    }
}
