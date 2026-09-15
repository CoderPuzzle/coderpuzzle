import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public String smallestFromLeaf(TreeNode root) {
        // Every root-to-leaf path, read backwards, is one candidate, and
        // the answer is the smallest of them — plain lexicographic order,
        // in which a strict prefix counts as smaller ("ab" < "aba"). One
        // shared path buffer holds a character per active root->node
        // frame: descending appends, unwinding pops, so no frame ever
        // carries a copy of its parent's path, and the buffer is reversed
        // into a candidate string only at a leaf. String.compareTo does
        // the comparing — character by character, strict prefix smaller —
        // which is exactly the statement's rule.
        // Iterative on purpose: the 8500-node chain the constraints allow
        // overflows the small stacks the judge hands this runtime; the
        // explicit stack is one entry per node or unwind marker and never
        // nests a call.
        String best = null;
        StringBuilder path = new StringBuilder(); // one char per active frame
        // TreeNodes to descend into and the literal ")" unwind markers
        // share the stack, in exactly the interleaving the walk needs.
        Deque<Object> pending = new ArrayDeque<>();
        pending.push(root);
        while (!pending.isEmpty()) {
            Object item = pending.pop();
            if (item instanceof String) {
                path.deleteCharAt(path.length() - 1);
                continue;
            }
            TreeNode node = (TreeNode) item;
            path.append((char) ('a' + node.val));
            if (node.left == null && node.right == null) {
                String candidate = new StringBuilder(path).reverse().toString();
                if (best == null || candidate.compareTo(best) < 0) {
                    best = candidate;
                }
                path.deleteCharAt(path.length() - 1); // a leaf unwinds itself
                continue;
            }
            pending.push(")"); // unwinds once both subtrees finish
            if (node.right != null) pending.push(node.right);
            if (node.left != null) pending.push(node.left);
        }
        return best;
    }
}
