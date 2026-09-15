import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashMap;
import java.util.Map;

class Solution {

    public int findDistance(TreeNode root, int p, int q) {
        // One iterative pass — an explicit stack, never recursion, since
        // a skewed tree runs 10^4 nodes deep — records each value's depth
        // and parent. Values are unique, so a value keys both maps. The
        // distance then resolves through the lowest common ancestor:
        // lift the deeper of p and q to the other's depth, walk both up
        // in lockstep until they meet — that meeting point is the LCA —
        // and return depth[p] + depth[q] - 2 * depth[lca], each leg of
        // the path counted once. p == q needs no special case: the lifts
        // make no move, the walk finds the two already equal, and the
        // formula cancels to 0. The root rides with parent null; no
        // climb ever passes the LCA, which is at the latest the root, so
        // the null is never unboxed.
        Map<Integer, Integer> depthOf = new HashMap<>();
        Map<Integer, Integer> parentOf = new HashMap<>();
        depthOf.put(root.val, 0);
        parentOf.put(root.val, null);
        Deque<TreeNode> pending = new ArrayDeque<>();
        pending.push(root);
        while (!pending.isEmpty()) {
            TreeNode node = pending.pop();
            int childDepth = depthOf.get(node.val) + 1;
            if (node.left != null) {
                depthOf.put(node.left.val, childDepth);
                parentOf.put(node.left.val, node.val);
                pending.push(node.left);
            }
            if (node.right != null) {
                depthOf.put(node.right.val, childDepth);
                parentOf.put(node.right.val, node.val);
                pending.push(node.right);
            }
        }
        int a = p;
        int b = q;
        while (depthOf.get(a) > depthOf.get(b)) {
            a = parentOf.get(a);
        }
        while (depthOf.get(b) > depthOf.get(a)) {
            b = parentOf.get(b);
        }
        while (a != b) {
            a = parentOf.get(a);
            b = parentOf.get(b);
        }
        return depthOf.get(p) + depthOf.get(q) - 2 * depthOf.get(a);
    }
}
