import java.util.ArrayList;
import java.util.List;

class Solution {

    // pathTo walks a target home in a straight line: every node recorded
    // is a strict ancestor-or-self of the target.
    private List<Integer> pathTo(TreeNode root, int target) {
        List<Integer> path = new ArrayList<>();
        TreeNode node = root;
        while (node.val != target) {
            path.add(node.val);
            node = target < node.val ? node.left : node.right;
        }
        path.add(target);
        return path;
    }

    public int lowestCommonAncestor(TreeNode root, int p, int q) {
        // Two written-down paths instead of one simultaneous descent.
        List<Integer> first = pathTo(root, p);
        List<Integer> second = pathTo(root, q);
        // Shared entries are exactly the shared ancestors; read both lists
        // in lockstep until they split (or one ends, when one target sits
        // above the other) and report the last value they agreed on.
        int answer = first.get(0);
        for (int i = 0; i < first.size() && i < second.size(); i++) {
            if (!first.get(i).equals(second.get(i))) {
                break;
            }
            answer = first.get(i);
        }
        return answer;
    }
}
