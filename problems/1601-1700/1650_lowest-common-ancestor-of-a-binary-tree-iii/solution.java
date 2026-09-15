import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

class Solution {

    public int lowestCommonAncestor(TreeNode root, int p, int q) {
        // The original hands p and q as node references that each carry a
        // parent pointer, with no root given at all. Here the tree
        // arrives as root plus the two target values instead, so the
        // first step recovers what parent would have given directly: one
        // iterative pre-order pass builds a value -> parent-value map.
        // Node values are unique, so a value is a safe, hashable key.
        Map<Integer, Integer> parentOf = new HashMap<>();
        parentOf.put(root.val, null);
        Deque<TreeNode> stack = new ArrayDeque<>();
        stack.push(root);
        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            if (node.left != null) {
                parentOf.put(node.left.val, node.val);
                stack.push(node.left);
            }
            if (node.right != null) {
                parentOf.put(node.right.val, node.val);
                stack.push(node.right);
            }
        }
        // Walk p up to the root, collecting every value on that path —
        // exactly the "store the path from p" step the original hints at.
        Set<Integer> ancestors = new HashSet<>();
        Integer val = p;
        while (val != null) {
            ancestors.add(val);
            val = parentOf.get(val);
        }
        // Walk q up until it lands on a value already seen from p; that
        // is the lowest shared ancestor. This also handles either target
        // already being the other's ancestor, since the starting value
        // is checked before climbing.
        val = q;
        while (!ancestors.contains(val)) {
            val = parentOf.get(val);
        }
        return val;
    }
}
