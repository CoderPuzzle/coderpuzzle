import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashMap;
import java.util.Map;

class Solution {

    public TreeNode buildTree(int[] inorder, int[] postorder) {
        // Value -> inorder index: makes each split lookup O(1) instead of a
        // linear scan. Values are unique, so a hit is exactly one split point.
        Map<Integer, Integer> index = new HashMap<>();
        for (int i = 0; i < inorder.length; i++) {
            index.put(inorder[i], i);
        }
        // Postorder ends with the root, and the reversed array lists root,
        // right subtree, left subtree -- so a cursor walking postorder
        // backwards hands out subtree roots in exactly the order the frames
        // below claim them.
        int position = postorder.length - 1;
        // A dummy parent lets the real root pass through the same attach
        // logic as every other node; the answer is dummy.left.
        TreeNode dummy = new TreeNode(0);
        // Frames are (parent, attachLeft, low, high) over inorder ranges.
        // Popping a frame claims at most one root value from the cursor, so
        // an explicit stack -- not recursion -- drives the build: the
        // constraint ceiling allows a 3000-node chain, and recursion that
        // deep is not safe in every judge language.
        Deque<Frame> stack = new ArrayDeque<>();
        stack.push(new Frame(dummy, true, 0, inorder.length));
        while (!stack.isEmpty()) {
            Frame frame = stack.pop();
            if (frame.low >= frame.high) {
                // Empty inorder range <=> missing subtree.
                continue;
            }
            int value = postorder[position];
            position--;
            TreeNode node = new TreeNode(value);
            if (frame.attachLeft) {
                frame.parent.left = node;
            } else {
                frame.parent.right = node;
            }
            int mid = index.get(value);
            // Inorder visits left, root, right: [low, mid) is the left
            // subtree and [mid + 1, high) the right. Left is pushed first
            // so the right frame pops -- and its root is consumed -- first.
            stack.push(new Frame(node, true, frame.low, mid));
            stack.push(new Frame(node, false, mid + 1, frame.high));
        }
        return dummy.left;
    }

    private static final class Frame {

        final TreeNode parent;
        final boolean attachLeft;
        final int low;
        final int high;

        Frame(TreeNode parent, boolean attachLeft, int low, int high) {
            this.parent = parent;
            this.attachLeft = attachLeft;
            this.low = low;
            this.high = high;
        }
    }
}
