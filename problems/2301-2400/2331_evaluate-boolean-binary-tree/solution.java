import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    public boolean evaluateTree(TreeNode root) {
        // The tree is a formula: leaves hold the literals (1 is true, 0
        // is false) and internal nodes apply their operator — 2 ORs the
        // two child bits, 3 ANDs them — so the answer is a post-order
        // fold. Spines of this tree can run hundreds of nodes deep, so
        // the fold runs on explicit stacks instead of the call stack:
        // entries say either "expand this node" or "apply this
        // operator". Expanding an internal node parks its operator
        // beneath its children, left on top; because the tree is full,
        // each subtree's entries net out to exactly one bit, so an
        // operator resurfaces only after its two operands sit ready on
        // the operand shelf.
        if (root == null) {
            return false;
        }
        Deque<Entry> work = new ArrayDeque<>();
        List<Boolean> operands = new ArrayList<>();
        work.push(new Entry(root, false));
        while (!work.isEmpty()) {
            Entry entry = work.pop();
            if (!entry.apply) {
                if (entry.node.left == null || entry.node.right == null) {
                    operands.add(entry.node.val == 1);
                } else {
                    work.push(new Entry(entry.node, true));
                    work.push(new Entry(entry.node.right, false));
                    work.push(new Entry(entry.node.left, false));
                }
            } else {
                boolean right = operands.remove(operands.size() - 1);
                boolean left = operands.remove(operands.size() - 1);
                boolean value = left && right;
                if (entry.node.val == 2) {
                    value = left || right;
                }
                operands.add(value);
            }
        }
        return operands.get(operands.size() - 1);
    }

    private static final class Entry {

        final TreeNode node;
        final boolean apply;

        Entry(TreeNode node, boolean apply) {
            this.node = node;
            this.apply = apply;
        }
    }
}
