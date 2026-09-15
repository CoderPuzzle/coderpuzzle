import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;
import java.util.function.IntConsumer;

class Solution {

    public int[] findMode(TreeNode root) {
        // An inorder walk of a BST emits values in ascending order, so all
        // copies of a value sit next to each other: a mode is just the
        // longest run of equal values in that walk. Two passes find it
        // without ever storing a table of counts. The traversal carries its
        // own stack of nodes: the tree may be a single 10^4-node chain,
        // whose walk would nest 10000 calls — over this judge's 512k Java
        // thread stack — so every runtime iterates instead.
        // Pass one measures the longest streak; nothing else is remembered,
        // so no table of counts is ever stored.
        Run run = new Run();
        inorder(root, run::widen);

        // Pass two re-walks and emits a value exactly when its streak
        // reaches the maximum — once per mode, in ascending order.
        List<Integer> modes = new ArrayList<>();
        run.streak = 0;
        run.prev = null;
        inorder(root, value -> {
            if (run.widen(value) == run.maxStreak) {
                modes.add(value);
            }
        });

        int[] result = new int[modes.size()];
        for (int index = 0; index < result.length; ++index) {
            result[index] = modes.get(index);
        }
        return result;
    }

    // Iterative inorder: descend the left spine stacking every node, then
    // emit each popped node and descend its right child.
    private void inorder(TreeNode root, IntConsumer visit) {
        Deque<TreeNode> stack = new ArrayDeque<>();
        TreeNode current = root;
        while (current != null || !stack.isEmpty()) {
            while (current != null) {
                stack.push(current);
                current = current.left;
            }
            current = stack.pop();
            visit.accept(current.val);
            current = current.right;
        }
    }

    // The streak state both passes share: the last value emitted and how
    // many times it has come up in a row.
    private static class Run {

        Integer prev;
        int streak;
        int maxStreak;

        // Extends the run and returns the streak now standing.
        int widen(int value) {
            streak = prev != null && prev == value ? streak + 1 : 1;
            prev = value;
            if (streak > maxStreak) {
                maxStreak = streak;
            }
            return streak;
        }
    }
}
