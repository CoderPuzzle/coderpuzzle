import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public TreeNode convertBST(TreeNode root) {
        // Reverse inorder — right subtree, node, left subtree — visits a
        // BST's keys in strictly descending order, so when the walk reaches
        // a node, every key greater than it has already been seen. The
        // running total the walk carries is therefore exactly the node's
        // new value: the original key plus the sum of all greater keys.
        // Add the key to the total, write the total back, and move on — no
        // second pass, no per-node search. The traversal carries its own
        // stack of nodes: the tree may be a single 10^4-node chain, whose
        // walk would nest 10000 calls — over this judge's 512k Java thread
        // stack — so every runtime iterates instead. Keys lie in
        // [-10^4, 10^4] and are unique, so the total never passes 50005000
        // in magnitude; int holds it with room to spare.
        int total = 0;
        Deque<TreeNode> stack = new ArrayDeque<>();
        TreeNode current = root;
        while (current != null || !stack.isEmpty()) {
            // Descend the right spine stacking every node, then visit each
            // popped node and descend its left child.
            while (current != null) {
                stack.push(current);
                current = current.right;
            }
            current = stack.pop();
            total += current.val;
            current.val = total;
            current = current.left;
        }
        return root;
    }
}
