import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

class Solution {

    public int maxSum(TreeNode root) {
        // Parent pointers let the DFS move up as well as down. Trying every
        // node as a path start, the search only enters a neighbor whose value
        // is not already on the current path — the seen set alone blocks the
        // way back to the parent, since the parent is always on the path.
        // Iterative with enter/exit markers, so a 1000-node chain cannot
        // overflow the 512k stack.
        Map<TreeNode, TreeNode> parent = new HashMap<>();
        parent.put(root, null);
        List<TreeNode> nodes = new ArrayList<>();
        Deque<TreeNode> pending = new ArrayDeque<>();
        pending.push(root);
        while (!pending.isEmpty()) {
            TreeNode node = pending.pop();
            nodes.add(node);
            if (node.left != null) {
                parent.put(node.left, node);
                pending.push(node.left);
            }
            if (node.right != null) {
                parent.put(node.right, node);
                pending.push(node.right);
            }
        }
        int best = Integer.MIN_VALUE;
        for (TreeNode start : nodes) {
            Set<Integer> seen = new HashSet<>();
            Deque<Object[]> stack = new ArrayDeque<>();
            stack.push(new Object[] { start, start.val, 0 }); // phase 0 enter
            while (!stack.isEmpty()) {
                Object[] frame = stack.pop();
                TreeNode node = (TreeNode) frame[0];
                int s = (Integer) frame[1];
                int phase = (Integer) frame[2];
                if (phase == 1) {
                    seen.remove(node.val);
                    continue;
                }
                seen.add(node.val);
                if (s > best) {
                    best = s;
                }
                stack.push(new Object[] { node, s, 1 });
                TreeNode[] neighbors = { node.left, node.right, parent.get(node) };
                for (TreeNode next : neighbors) {
                    if (next != null && !seen.contains(next.val)) {
                        stack.push(new Object[] { next, s + next.val, 0 });
                    }
                }
            }
        }
        return best;
    }
}
