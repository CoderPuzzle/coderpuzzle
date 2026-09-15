import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashSet;
import java.util.Set;

class Solution {

    public boolean findTarget(TreeNode root, int k) {
        // A value pairs with k minus itself, so the whole question is set
        // membership: keep every value already visited in a hash set, and
        // each new node learns with one lookup whether its partner came
        // earlier. The lookup comes before the insert — the ordering that
        // forbids a node pairing with itself, so a k equal to twice a
        // value that occurs once stays false. The visiting order is
        // irrelevant: any traversal that reaches every node sees one
        // member of a summing pair before the other, so a plain preorder
        // returns true at the first hit and false only after the whole
        // tree is exhausted. The walk carries its own stack of nodes: the
        // tree may be a single 10^4-node chain, whose walk would nest
        // 10000 calls — over this judge's 512k Java thread stack — so
        // every runtime iterates instead.
        Set<Integer> seen = new HashSet<>();
        Deque<TreeNode> stack = new ArrayDeque<>();
        stack.push(root);
        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            if (seen.contains(k - node.val)) return true;
            seen.add(node.val);
            if (node.left != null) stack.push(node.left);
            if (node.right != null) stack.push(node.right);
        }
        return false;
    }
}
