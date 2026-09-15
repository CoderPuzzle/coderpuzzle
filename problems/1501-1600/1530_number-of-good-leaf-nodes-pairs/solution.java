import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    public int countPairs(TreeNode root, int distance) {
        // Every good pair's path bends at its lowest common ancestor, so
        // counting pairs reduces to counting, at each node, how many ways a
        // leaf on one side meets a leaf on the other within budget.
        // Postorder gives each node its children's answers first: a table
        // indexed by relative depth (0..distance) counting leaves that many
        // edges below. The tree can hold up to 2^10 nodes and a skewed
        // instance packs them into one chain — deep enough to sit
        // uncomfortably close to the 512 KB stack the judge hands Java — so
        // both the traversal and the merge run off explicit stacks instead
        // of the call stack.

        // Build the "root, right, left" visiting order with one stack;
        // reversed, that order is exactly postorder (left, right, root).
        Deque<TreeNode> stack = new ArrayDeque<>();
        stack.push(root);
        List<TreeNode> order = new ArrayList<>();
        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            order.add(node);
            if (node.left != null) stack.push(node.left);
            if (node.right != null) stack.push(node.right);
        }

        int answer = 0;
        Deque<int[]> valueStack = new ArrayDeque<>();
        for (int i = order.size() - 1; i >= 0; i--) {
            TreeNode node = order.get(i);
            boolean hasLeft = node.left != null;
            boolean hasRight = node.right != null;
            if (!hasLeft && !hasRight) {
                int[] freq = new int[distance + 1];
                freq[0] = 1;
                valueStack.push(freq);
                continue;
            }

            // Postorder guarantees the right child's table (if any) was
            // pushed most recently, then the left child's.
            int[] rightFreq = hasRight ? valueStack.pop() : null;
            int[] leftFreq = hasLeft ? valueStack.pop() : null;

            int[] merged = new int[distance + 1];
            if (hasLeft && hasRight) {
                for (int d1 = 0; d1 <= distance; d1++) {
                    if (leftFreq[d1] == 0) continue;
                    int budget = distance - d1 - 2;
                    if (budget < 0) continue;
                    int upper = Math.min(budget, distance);
                    for (int d2 = 0; d2 <= upper; d2++) {
                        if (rightFreq[d2] != 0) answer += leftFreq[d1] * rightFreq[d2];
                    }
                }
                for (int d = 0; d < distance; d++) merged[d + 1] += leftFreq[d] + rightFreq[d];
            } else if (hasLeft) {
                for (int d = 0; d < distance; d++) merged[d + 1] += leftFreq[d];
            } else {
                for (int d = 0; d < distance; d++) merged[d + 1] += rightFreq[d];
            }
            valueStack.push(merged);
        }

        return answer;
    }
}
