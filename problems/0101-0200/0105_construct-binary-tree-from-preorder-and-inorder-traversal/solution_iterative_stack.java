import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public TreeNode buildTree(int[] preorder, int[] inorder) {
        if (preorder.length == 0) {
            return null;
        }
        TreeNode root = new TreeNode(preorder[0]);
        // The spine: every node whose left side is (possibly still) growing
        // and whose right child is still pending. Preorder's next value is
        // either the spine top's left child, or the right child of whatever
        // portion of the spine inorder has already finished.
        Deque<TreeNode> spine = new ArrayDeque<>();
        spine.push(root);
        int cursor = 0; // next inorder entry awaiting its turn
        for (int i = 1; i < preorder.length; i++) {
            int value = preorder[i];
            if (spine.peek().val != inorder[cursor]) {
                // The top is not due yet, so the value keeps descending left.
                TreeNode node = new TreeNode(value);
                spine.peek().left = node;
                spine.push(node);
            } else {
                // The top is due in inorder: its whole left side is settled,
                // so pop it (and any ancestors also due) -- the new value is
                // the right child of the deepest node popped.
                TreeNode last = spine.pop();
                cursor++;
                while (!spine.isEmpty() && spine.peek().val == inorder[cursor]) {
                    last = spine.pop();
                    cursor++;
                }
                TreeNode node = new TreeNode(value);
                last.right = node;
                spine.push(node);
            }
        }
        return root;
    }
}
