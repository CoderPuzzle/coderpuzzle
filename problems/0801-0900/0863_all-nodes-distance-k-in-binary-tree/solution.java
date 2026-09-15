import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

class Solution {

    public int[] distanceK(TreeNode root, int target, int k) {
        // Distance k counts edges on paths that may climb through parents as
        // well as descend through children, so the answer can spill out of
        // the target's own subtree — a downward search alone cannot reach
        // it. One breadth-first pass from the root records each node's
        // parent and collects every node, which also locates the node
        // carrying the target value.
        Map<TreeNode, TreeNode> parents = new HashMap<>();
        List<TreeNode> order = new ArrayList<>();
        if (root != null) {
            order.add(root);
        }
        for (int head = 0; head < order.size(); ++head) {
            TreeNode node = order.get(head);
            if (node.left != null) {
                parents.put(node.left, node);
                order.add(node.left);
            }
            if (node.right != null) {
                parents.put(node.right, node);
                order.add(node.right);
            }
        }
        TreeNode start = null;
        for (TreeNode node : order) {
            if (node.val == target) {
                start = node;
                break;
            }
        }

        // A level-synchronized walk from the target spreads one edge per step
        // through parent, left child, and right child, never revisiting a
        // node, so after k steps the frontier holds exactly the nodes at
        // distance k. Sorting the collected values settles the ascending
        // output order the statement pins.
        List<TreeNode> frontier = new ArrayList<>();
        frontier.add(start);
        Set<TreeNode> seen = new HashSet<>();
        seen.add(start);
        for (int step = 0; step < k; ++step) {
            List<TreeNode> reached = new ArrayList<>();
            for (TreeNode node : frontier) {
                TreeNode parent = parents.get(node);
                if (parent != null && !seen.contains(parent)) {
                    seen.add(parent);
                    reached.add(parent);
                }
                if (node.left != null && !seen.contains(node.left)) {
                    seen.add(node.left);
                    reached.add(node.left);
                }
                if (node.right != null && !seen.contains(node.right)) {
                    seen.add(node.right);
                    reached.add(node.right);
                }
            }
            frontier = reached;
            if (frontier.isEmpty()) {
                break;
            }
        }
        int[] result = new int[frontier.size()];
        for (int index = 0; index < result.length; ++index) {
            result[index] = frontier.get(index).val;
        }
        Arrays.sort(result);
        return result;
    }
}
