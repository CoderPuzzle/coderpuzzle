import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[][] findLeaves(TreeNode root) {
        List<List<Integer>> groups = new ArrayList<>();
        height(root, groups);
        int[][] out = new int[groups.size()][];
        for (int i = 0; i < groups.size(); i++) {
            List<Integer> values = groups.get(i);
            int[] row = new int[values.size()];
            for (int j = 0; j < values.size(); j++) {
                row[j] = values.get(j);
            }
            out[i] = row;
        }
        return out;
    }

    // Post-order: each call reports the height of the subtree rooted at
    // `node` (a leaf is height 0) and files the node's value into that
    // height's group as the recursion unwinds — collecting leaves round by
    // round is just sorting the nodes by height, and finishing the left
    // subtree before entering the right one pins each group to
    // left-to-right order.
    private int height(TreeNode node, List<List<Integer>> groups) {
        if (node == null) {
            return -1;
        }
        int nodeHeight = 1 + Math.max(height(node.left, groups), height(node.right, groups));
        // A first sighting of a height always arrives after every smaller
        // height has been seen, so this grows the list by exactly one.
        if (nodeHeight == groups.size()) {
            groups.add(new ArrayList<>());
        }
        groups.get(nodeHeight).add(node.val);
        return nodeHeight;
    }
}
