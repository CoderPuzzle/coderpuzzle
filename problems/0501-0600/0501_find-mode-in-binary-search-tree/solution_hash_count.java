import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Deque;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public int[] findMode(TreeNode root) {
        // Counting modes never needed the BST ordering: the modes are a
        // property of the multiset of values, whatever order a walk meets
        // them in. So this version takes the tree as an ordinary container
        // — a stack pops a node, tallies its value into a HashMap keyed by
        // the value itself, and pushes the children — and the map, not
        // adjacency, does the bookkeeping. The walk stays iterative: the
        // tree may be a single 10^4-node chain, whose traversal would nest
        // 10000 calls — over this judge's 512k Java thread stack.
        Map<Integer, Integer> counts = new HashMap<>();
        Deque<TreeNode> stack = new ArrayDeque<>();
        if (root != null) {
            stack.push(root);
        }
        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            counts.merge(node.val, 1, Integer::sum);
            if (node.right != null) {
                stack.push(node.right);
            }
            if (node.left != null) {
                stack.push(node.left);
            }
        }

        // One pass over the map finds the largest count; a second collects
        // every value that reaches it. A HashMap iterates in arbitrary
        // order — the ascending order the streak walk gets for free from
        // inorder is absent here — so the survivors are sorted once at the
        // end.
        int best = 0;
        for (int count : counts.values()) {
            best = Math.max(best, count);
        }
        List<Integer> modes = new ArrayList<>();
        for (Map.Entry<Integer, Integer> entry : counts.entrySet()) {
            if (entry.getValue() == best) {
                modes.add(entry.getKey());
            }
        }
        Collections.sort(modes);
        int[] result = new int[modes.size()];
        for (int index = 0; index < result.length; ++index) {
            result[index] = modes.get(index);
        }
        return result;
    }
}
