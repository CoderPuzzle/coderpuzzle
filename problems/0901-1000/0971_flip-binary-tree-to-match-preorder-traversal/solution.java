import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    public int[] flipMatchVoyage(TreeNode root, int[] voyage) {
        // The walk and the voyage run in lockstep: a preorder descent that
        // consumes one voyage value per node and, whenever the next value
        // names the right child rather than the left, flips the current
        // node and records it. Values are unique, so each flip decision is
        // forced — the recorded set is the smallest one, listed in the
        // order the resulting preorder meets the flipped nodes. Any
        // disagreement, or voyage entries left over, means no flip set
        // works: [-1].
        List<Integer> flips = new ArrayList<>();
        Deque<TreeNode> pending = new ArrayDeque<>();
        if (root != null) {
            pending.push(root);
        }
        int cursor = 0;
        while (!pending.isEmpty()) {
            TreeNode node = pending.pop();
            if (cursor == voyage.length || voyage[cursor] != node.val) {
                return new int[] { -1 };
            }
            ++cursor;
            TreeNode left = node.left;
            TreeNode right = node.right;
            if (left != null && (cursor == voyage.length || voyage[cursor] != left.val)) {
                flips.add(node.val);
                TreeNode swap = left;
                left = right;
                right = swap;
            }
            if (right != null) pending.push(right);
            if (left != null) pending.push(left);
        }
        if (cursor != voyage.length) {
            return new int[] { -1 };
        }
        int[] answer = new int[flips.size()];
        for (int index = 0; index < answer.length; ++index) {
            answer[index] = flips.get(index);
        }
        return answer;
    }
}
