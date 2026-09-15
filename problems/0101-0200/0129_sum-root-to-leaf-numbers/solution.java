import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public int sumNumbers(TreeNode root) {
        // The node range [1, 1000] guarantees a root, so the walk starts at
        // the first digit with no empty-tree case.
        int total = 0;
        // Loop invariant: the stacks hold (node, prefix) pairs where prefix
        // is the number formed by the digits from the root down to (but
        // excluding) `node`; appending node.val extends it by one digit.
        Deque<TreeNode> nodes = new ArrayDeque<>();
        Deque<Integer> prefixes = new ArrayDeque<>();
        nodes.push(root);
        prefixes.push(0);
        while (!nodes.isEmpty()) {
            TreeNode node = nodes.pop();
            int number = prefixes.pop() * 10 + node.val;
            if (node.left == null && node.right == null) {
                // The path ends here, so its number is complete and joins
                // the total — the only place a value is ever summed.
                total += number;
            } else {
                // An internal node never sums on its own: its digit only
                // matters inside the numbers of the leaves below it.
                if (node.left != null) {
                    nodes.push(node.left);
                    prefixes.push(number);
                }
                if (node.right != null) {
                    nodes.push(node.right);
                    prefixes.push(number);
                }
            }
        }
        return total;
    }
}
