import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    // A frame carries a node, the remaining sum before paying for it, and the
    // path-buffer length on entry — popping it later truncates the buffer back
    // to that prefix, which is the backtracking a recursive stack performs.
    private record Frame(TreeNode node, int remaining, int depth) {}

    public int[][] pathSum(TreeNode root, int targetSum) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) {
            // The empty tree has no root-to-leaf paths at all.
            return new int[0][];
        }
        // `path` is one shared buffer: every accepted path is a copy, and the
        // walk truncates the buffer back instead of rebuilding it per node.
        List<Integer> path = new ArrayList<>();
        // Preorder with an explicit stack — the same shape in every language,
        // chosen because recursion would overflow Python's call-stack limit
        // on a 5000-node chain.
        Deque<Frame> stack = new ArrayDeque<>();
        stack.push(new Frame(root, targetSum, 0));
        while (!stack.isEmpty()) {
            Frame frame = stack.pop();
            TreeNode node = frame.node();
            path.subList(frame.depth(), path.size()).clear();
            path.add(node.val);
            int remaining = frame.remaining() - node.val;
            if (node.left == null && node.right == null) {
                if (remaining == 0) {
                    // A leaf whose root-to-leaf sum is on target: record a
                    // copy, since `path` keeps mutating after this point.
                    result.add(new ArrayList<>(path));
                }
                continue;
            }
            // Push the right child first so the left subtree is popped first:
            // matching paths are discovered in preorder, left to right.
            if (node.right != null) stack.push(new Frame(node.right, remaining, frame.depth() + 1));
            if (node.left != null) stack.push(new Frame(node.left, remaining, frame.depth() + 1));
        }
        int[][] out = new int[result.size()][];
        for (int i = 0; i < result.size(); i++) {
            List<Integer> match = result.get(i);
            int[] row = new int[match.size()];
            for (int j = 0; j < match.size(); j++) {
                row[j] = match.get(j);
            }
            out[i] = row;
        }
        return out;
    }
}
