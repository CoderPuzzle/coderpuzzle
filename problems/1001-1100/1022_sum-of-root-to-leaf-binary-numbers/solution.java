import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public int sumRootToLeaf(TreeNode root) {
        // The node range [1, 1000] guarantees a root, so the walk starts at
        // the first bit with no empty-tree case. The running value and the
        // total are carried in `long` rather than `int`: nothing in the
        // statement caps how deep a path runs before it must fit the
        // promised 32-bit answer, so a wide accumulator removes any risk
        // of intermediate overflow while a long prefix is still being
        // walked.
        long total = 0;
        // Loop invariant: the stacks hold (node, running) pairs where
        // running is the value formed by the bits from the root down to
        // (but excluding) `node`; appending node.val extends it by one bit.
        Deque<TreeNode> nodes = new ArrayDeque<>();
        Deque<Long> runningValues = new ArrayDeque<>();
        nodes.push(root);
        runningValues.push(0L);
        while (!nodes.isEmpty()) {
            TreeNode node = nodes.pop();
            long value = runningValues.pop() * 2 + node.val;
            if (node.left == null && node.right == null) {
                // The path ends here, so its value is complete and joins
                // the total — the only place a value is ever summed.
                total += value;
            } else {
                // An internal node never sums on its own: its bit only
                // matters inside the values of the leaves below it.
                if (node.left != null) {
                    nodes.push(node.left);
                    runningValues.push(value);
                }
                if (node.right != null) {
                    nodes.push(node.right);
                    runningValues.push(value);
                }
            }
        }
        // The statement guarantees the answer fits a 32-bit integer.
        return (int) total;
    }
}
