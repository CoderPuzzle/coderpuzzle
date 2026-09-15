import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public int sumEvenGrandparent(TreeNode root) {
        // Each stack entry carries (node, parent value, grandparent value) so
        // the parity test needs no upward links. Explicit stack: the tree may
        // be a 10^4-node chain, beyond any recursion budget. Only non-null
        // children are pushed (ArrayDeque rejects nulls).
        Deque<TreeNode> nodes = new ArrayDeque<>();
        Deque<int[]> carried = new ArrayDeque<>();
        final int none = 1; // odd sentinel: contributes nothing
        int total = 0;
        if (root != null) {
            nodes.push(root);
            carried.push(new int[] { none, none });
        }
        while (!nodes.isEmpty()) {
            TreeNode node = nodes.pop();
            int[] roles = carried.pop();
            int parent = roles[0];
            int grandparent = roles[1];
            if (grandparent % 2 == 0) {
                total += node.val;
            }
            if (node.left != null) {
                nodes.push(node.left);
                carried.push(new int[] { node.val, parent });
            }
            if (node.right != null) {
                nodes.push(node.right);
                carried.push(new int[] { node.val, parent });
            }
        }
        return total;
    }
}
