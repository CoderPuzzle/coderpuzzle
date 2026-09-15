import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

class Solution {

    public TreeNode canMerge(List<TreeNode> trees) {
        // The final root is the unique root value that never appears as a
        // leaf of another tree; duplicate leaf values make merging impossible
        // outright, since a valid BST holds each value exactly once.
        Set<Integer> leafSeen = new HashSet<>();
        for (TreeNode root : trees) {
            if (root.left != null && !leafSeen.add(root.left.val)) {
                return null;
            }
            if (root.right != null && !leafSeen.add(root.right.val)) {
                return null;
            }
        }
        TreeNode root = null;
        int candidates = 0;
        for (TreeNode r : trees) {
            if (!leafSeen.contains(r.val)) {
                root = r;
                ++candidates;
            }
        }
        if (candidates != 1) {
            return null;
        }

        // by_val maps every live node value to its node; splicing a tree in
        // registers the incoming nodes so later trees can chain onto them.
        Map<Integer, TreeNode> byVal = new HashMap<>();
        Deque<TreeNode> stack = new ArrayDeque<>();
        stack.push(root);
        while (!stack.isEmpty()) {
            TreeNode nd = stack.pop();
            byVal.put(nd.val, nd);
            if (nd.left != null) {
                stack.push(nd.left);
            }
            if (nd.right != null) {
                stack.push(nd.right);
            }
        }

        List<TreeNode> pending = new ArrayList<>();
        for (TreeNode t : trees) {
            if (t != root) {
                pending.add(t);
            }
        }
        while (!pending.isEmpty()) {
            List<TreeNode> rest = new ArrayList<>();
            boolean progressed = false;
            for (TreeNode tree : pending) {
                TreeNode host = byVal.get(tree.val);
                // A host must be a true leaf other than the final root.
                if (host != null && host != root && host.left == null && host.right == null) {
                    host.left = tree.left;
                    host.right = tree.right;
                    Deque<TreeNode> sub = new ArrayDeque<>();
                    sub.push(tree);
                    while (!sub.isEmpty()) {
                        TreeNode nd = sub.pop();
                        byVal.put(nd.val, nd);
                        if (nd.left != null) {
                            sub.push(nd.left);
                        }
                        if (nd.right != null) {
                            sub.push(nd.right);
                        }
                    }
                    progressed = true;
                } else {
                    rest.add(tree);
                }
            }
            if (!progressed) {
                return null;
            }
            pending = rest;
        }

        // Validate: strict in-order increase proves BST ordering and that
        // every value is distinct; the distinct-value count proves all n - 1
        // merges actually landed inside one connected tree. Iterative walk,
        // safe at n = 5*10^4.
        long prev = -1;
        Set<Integer> seen = new HashSet<>();
        Deque<TreeNode> stack2 = new ArrayDeque<>();
        TreeNode cur = root;
        while (!stack2.isEmpty() || cur != null) {
            while (cur != null) {
                stack2.push(cur);
                cur = cur.left;
            }
            cur = stack2.pop();
            if (prev >= 0 && (long) cur.val <= prev) {
                return null;
            }
            prev = cur.val;
            seen.add(cur.val);
            cur = cur.right;
        }
        if (seen.size() != byVal.size()) {
            return null;
        }
        return root;
    }
}
