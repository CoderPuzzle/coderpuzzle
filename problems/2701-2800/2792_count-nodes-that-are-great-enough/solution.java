import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public int countGreatEnoughNodes(TreeNode root, int k) {
        // Post-order over an explicit stack: each node yields the sorted
        // list of its subtree's min(size, k) smallest values. The pooled
        // child lists plus the node's own value are sorted and truncated,
        // so a full subtree listing is never needed. The kept list reaches
        // length k exactly when the subtree holds at least k nodes, and its
        // last entry is then the subtree's k-th smallest value counted with
        // multiplicity: the node exceeds it iff at least k actual nodes are
        // strictly smaller — duplicates of the node itself never pass.
        int great = 0;
        if (root == null) {
            return 0;
        }
        Map<TreeNode, List<Integer>> smallest = new HashMap<>();
        Deque<Object[]> stack = new ArrayDeque<>();
        stack.push(new Object[] { root, false });
        while (!stack.isEmpty()) {
            Object[] top = stack.pop();
            TreeNode node = (TreeNode) top[0];
            if (!((Boolean) top[1])) {
                stack.push(new Object[] { node, true });
                if (node.left != null) {
                    stack.push(new Object[] { node.left, false });
                }
                if (node.right != null) {
                    stack.push(new Object[] { node.right, false });
                }
                continue;
            }
            List<Integer> pooled = new ArrayList<>();
            pooled.add(node.val);
            for (TreeNode child : new TreeNode[] { node.left, node.right }) {
                List<Integer> part = smallest.remove(child);
                if (part != null) {
                    pooled.addAll(part);
                }
            }
            pooled.sort(null);
            if (pooled.size() > k) {
                pooled.subList(k, pooled.size()).clear();
            }
            smallest.put(node, pooled);
            if (pooled.size() == k && node.val > pooled.get(k - 1)) {
                great++;
            }
        }
        return great;
    }
}
