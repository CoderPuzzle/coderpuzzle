import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public int maxProduct(TreeNode root) {
        // Iterative post-order computes every subtree sum (a 5*10^4 chain
        // would overflow the recursion budget); each non-root sum s scores
        // the cut s * (total - s), maximized before the modulo.
        Map<TreeNode, Long> sums = new HashMap<>();
        Deque<TreeNode> nodes = new ArrayDeque<>();
        Deque<Boolean> expanded = new ArrayDeque<>();
        nodes.push(root);
        expanded.push(false);
        while (!nodes.isEmpty()) {
            TreeNode cur = nodes.pop();
            boolean done = expanded.pop();
            if (done) {
                long left = cur.left == null ? 0 : sums.get(cur.left);
                long right = cur.right == null ? 0 : sums.get(cur.right);
                sums.put(cur, cur.val + left + right);
            } else {
                nodes.push(cur);
                expanded.push(true);
                if (cur.left != null) {
                    nodes.push(cur.left);
                    expanded.push(false);
                }
                if (cur.right != null) {
                    nodes.push(cur.right);
                    expanded.push(false);
                }
            }
        }
        long total = sums.get(root);
        long best = 0;
        List<Map.Entry<TreeNode, Long>> entries = new ArrayList<>(sums.entrySet());
        for (Map.Entry<TreeNode, Long> entry : entries) {
            if (entry.getKey() != root) {
                long part = entry.getValue();
                best = Math.max(best, part * (total - part));
            }
        }
        return (int) (best % 1000000007L);
    }
}
