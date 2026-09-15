import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;
import java.util.HashMap;
import java.util.Map;

class Solution {

    public int[] findFrequentTreeSum(TreeNode root) {
        // Post-order, one pass: a node's subtree sum is its own value plus
        // the two sums already computed beneath it, so each node's sum is
        // settled exactly once and the counter tallies every subtree. The
        // traversal carries its own stack of frames: the tree may be a
        // single 10^4-node chain, whose walk would nest 10000 calls —
        // over this judge's 512k Java thread stack — so every runtime
        // iterates instead.
        Map<Integer, Integer> counts = new HashMap<>();
        // Frame = a node, which child remains to visit (0 = left pending,
        // 1 = right pending, 2 = ready to sum), and the sum of the
        // subtrees already finished beneath it.
        Deque<Frame> stack = new ArrayDeque<>();
        if (root != null) {
            stack.push(new Frame(root));
        }
        while (!stack.isEmpty()) {
            Frame frame = stack.peek();
            if (frame.state == 0) {
                frame.state = 1;
                if (frame.node.left != null) {
                    stack.push(new Frame(frame.node.left));
                }
            } else if (frame.state == 1) {
                frame.state = 2;
                if (frame.node.right != null) {
                    stack.push(new Frame(frame.node.right));
                }
            } else {
                stack.pop();
                int total = frame.node.val + frame.children;
                counts.merge(total, 1, Integer::sum);
                if (!stack.isEmpty()) {
                    stack.peek().children += total;
                }
            }
        }
        int best = 0;
        for (int count : counts.values()) {
            if (count > best) {
                best = count;
            }
        }
        int matches = 0;
        for (int count : counts.values()) {
            if (count == best) {
                matches++;
            }
        }
        int[] result = new int[matches];
        int index = 0;
        for (Map.Entry<Integer, Integer> entry : counts.entrySet()) {
            if (entry.getValue() == best) {
                result[index++] = entry.getKey();
            }
        }
        // The final sort pins the output to the ascending order the judge
        // compares exactly.
        Arrays.sort(result);
        return result;
    }

    // A node under traversal, accumulating the sum of the subtrees already
    // finished beneath it.
    private static class Frame {

        final TreeNode node;
        int state;
        int children;

        Frame(TreeNode node) {
            this.node = node;
        }
    }
}
