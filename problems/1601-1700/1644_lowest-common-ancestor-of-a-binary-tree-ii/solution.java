import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

class Solution {

    public TreeNode lowestCommonAncestor(TreeNode root, int p, int q) {
        // Iterative pre-order build of a value -> parent-value map (and a
        // value -> node lookup) in one pass. Node values are unique, so a
        // value serves as a stable, hashable key everywhere. Once built,
        // p and q's presence is a plain membership check against nodeOf —
        // this is the existence check, done for free by the same walk that
        // will drive the LCA search.
        if (root == null) {
            return null;
        }
        Map<Integer, TreeNode> nodeOf = new HashMap<>();
        Map<Integer, Integer> parentOf = new HashMap<>();
        parentOf.put(root.val, null);
        Deque<TreeNode> stack = new ArrayDeque<>();
        stack.push(root);
        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            nodeOf.put(node.val, node);
            if (node.left != null) {
                parentOf.put(node.left.val, node.val);
                stack.push(node.left);
            }
            if (node.right != null) {
                parentOf.put(node.right.val, node.val);
                stack.push(node.right);
            }
        }
        if (!nodeOf.containsKey(p) || !nodeOf.containsKey(q)) {
            return null;
        }
        // Walk p up to the root, collecting every value on that path.
        Set<Integer> ancestors = new HashSet<>();
        Integer val = p;
        while (val != null) {
            ancestors.add(val);
            val = parentOf.get(val);
        }
        // Walk q up until it lands on a value already seen from p; that is
        // the lowest shared ancestor (this also handles p == q and either
        // one already being the other's ancestor, since the starting value
        // is checked before climbing).
        val = q;
        while (!ancestors.contains(val)) {
            val = parentOf.get(val);
        }
        return nodeOf.get(val);
    }
}
