import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

class Solution {

    public int findClosestLeaf(TreeNode root, int k) {
        // Distance here runs over the tree's edges as an undirected graph: the
        // nearest leaf may sit in another subtree, up through parents and
        // across the root, so a descending search alone cannot prove a leaf
        // nearest. One breadth-first pass from the root records each node's
        // parent and collects every node, which also locates k.
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
        TreeNode target = null;
        for (TreeNode node : order) {
            if (node.val == k) {
                target = node;
                break;
            }
        }

        // A level-synchronized walk from the k node spreads one edge per step
        // through parent, left child, and right child. The first level
        // holding a leaf holds every nearest leaf; the smallest value among
        // them settles the tie rule.
        List<TreeNode> frontier = new ArrayList<>();
        frontier.add(target);
        Set<TreeNode> seen = new HashSet<>();
        seen.add(target);
        while (true) {
            int best = 0;
            boolean leafFound = false;
            for (TreeNode node : frontier) {
                if (node.left == null && node.right == null && (!leafFound || node.val < best)) {
                    best = node.val;
                    leafFound = true;
                }
            }
            if (leafFound) {
                return best;
            }
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
        }
    }
}
