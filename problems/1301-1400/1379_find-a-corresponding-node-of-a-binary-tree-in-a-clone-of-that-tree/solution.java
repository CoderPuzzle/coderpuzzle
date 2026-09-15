import java.util.ArrayDeque;

/**
 * Definition for a binary tree node.
 * public class TreeNode { int val; TreeNode left; TreeNode right; TreeNode() {} TreeNode(int val) { this.val = val; } }
 */
class Solution {

    public TreeNode getTargetCopy(final TreeNode original, final TreeNode cloned, final int target) {
        // Parallel preorder: identical shapes keep every pair aligned.
        ArrayDeque<TreeNode[]> stack = new ArrayDeque<>();
        stack.push(new TreeNode[] { original, cloned });
        while (!stack.isEmpty()) {
            TreeNode[] pair = stack.pop();
            if (pair[0] == null) continue;
            if (pair[0].val == target) return pair[1];
            stack.push(new TreeNode[] { pair[0].left, pair[1].left });
            stack.push(new TreeNode[] { pair[0].right, pair[1].right });
        }
        return null;
    }
}
