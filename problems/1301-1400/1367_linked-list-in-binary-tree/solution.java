/**
 * Definition for singly-linked list.
 * public class ListNode { int val; ListNode next; ListNode() {} ListNode(int val) { this.val = val; } }
 * Definition for a binary tree node.
 * public class TreeNode { int val; TreeNode left; TreeNode right; TreeNode() {} TreeNode(int val) { this.val = val; } }
 */
class Solution {

    public boolean isSubPath(ListNode head, TreeNode root) {
        // Flatten the list once so matching works with plain indices.
        java.util.List<Integer> values = new java.util.ArrayList<>();
        for (ListNode node = head; node != null; node = node.next) values.add(node.val);

        if (root == null) return false;

        // Walk the whole tree; from every node that starts a match, follow it
        // downward with an explicit (node, index) stack of Object[] frames.
        java.util.ArrayDeque<Object[]> stack = new java.util.ArrayDeque<>();
        stack.push(new Object[] { root, Integer.valueOf(0) });
        while (!stack.isEmpty()) {
            Object[] frame = stack.pop();
            TreeNode treeNode = (TreeNode) frame[0];
            int phase = (Integer) frame[1];
            if (phase == 0 && matchFrom(treeNode, values)) return true;
            if (treeNode.left != null) stack.push(new Object[] { treeNode.left, Integer.valueOf(0) });
            if (treeNode.right != null) stack.push(new Object[] { treeNode.right, Integer.valueOf(0) });
        }
        return false;
    }

    private boolean matchFrom(TreeNode start, java.util.List<Integer> values) {
        if (values.isEmpty() || start.val != values.get(0)) return false;
        java.util.ArrayDeque<Object[]> frames = new java.util.ArrayDeque<>();
        frames.push(new Object[] { start, Integer.valueOf(0) });
        while (!frames.isEmpty()) {
            Object[] frame = frames.pop();
            TreeNode node = (TreeNode) frame[0];
            int index = (Integer) frame[1];
            if (index + 1 == values.size()) return true;
            int nxt = values.get(index + 1);
            if (node.left != null && node.left.val == nxt) {
                frames.push(new Object[] { node.left, Integer.valueOf(index + 1) });
            }
            if (node.right != null && node.right.val == nxt) {
                frames.push(new Object[] { node.right, Integer.valueOf(index + 1) });
            }
        }
        return false;
    }
}
