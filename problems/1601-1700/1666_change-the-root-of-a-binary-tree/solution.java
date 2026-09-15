import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashMap;
import java.util.Map;

class Solution {

    public TreeNode flipBinaryTree(TreeNode root, int leaf) {
        // Rerooting is a walk, not a rebuild: the rule names, for every
        // node on the leaf-to-root path, exactly which pointers move. One
        // descent first records each node's parent, keyed by value (values
        // are unique, so the first node met with the leaf's value is the
        // leaf itself) — the parent pointers the statement demands, kept
        // in the solver's own map.
        Map<Integer, TreeNode> parent = new HashMap<>();
        parent.put(root.val, null);
        TreeNode target = null;
        Deque<TreeNode> pending = new ArrayDeque<>();
        pending.push(root);
        while (!pending.isEmpty()) {
            TreeNode node = pending.pop();
            if (node.val == leaf) {
                target = node;
            }
            if (node.right != null) {
                parent.put(node.right.val, node);
                pending.push(node.right);
            }
            if (node.left != null) {
                parent.put(node.left.val, node);
                pending.push(node.left);
            }
        }
        // Then the two steps are applied bottom-up, stopping before the
        // root: clear the parent's downward pointer (emptying the slot the
        // moved subtree needs), move a surviving left child across to the
        // right, and attach the parent as the new left child. The leaf the
        // walk started from is the new root.
        TreeNode cur = target;
        while (parent.get(cur.val) != null) {
            TreeNode above = parent.get(cur.val);
            if (above.left == cur) {
                above.left = null;
            } else if (above.right == cur) {
                above.right = null;
            }
            if (cur.left != null) {
                cur.right = cur.left;
            }
            cur.left = above;
            cur = above;
        }
        return target;
    }
}
