import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;
import java.util.StringJoiner;

class Codec {

    // Level-order codec with explicit null markers. The format is this
    // solution's own choice — the judge only requires that
    // deserialize(serialize(root)) rebuilds the same tree. Both directions
    // are iterative, so deep trees are safe.

    public String serialize(TreeNode root) {
        // Level lists rather than a queue: ArrayDeque rejects nulls, and the
        // absent children are exactly what must be emitted as markers.
        List<String> parts = new ArrayList<>();
        List<TreeNode> level = new ArrayList<>();
        level.add(root);
        while (!level.isEmpty()) {
            List<TreeNode> next = new ArrayList<>();
            for (TreeNode node : level) {
                if (node == null) {
                    parts.add("#");
                    continue;
                }
                parts.add(Integer.toString(node.val));
                next.add(node.left);
                next.add(node.right);
            }
            level = next;
        }
        // Trailing nulls only mark absent slots, so trimming them keeps the
        // sequence uniquely recoverable.
        int end = parts.size();
        while (end > 0 && "#".equals(parts.get(end - 1))) {
            end--;
        }
        StringJoiner tokens = new StringJoiner(",");
        for (int index = 0; index < end; index++) {
            tokens.add(parts.get(index));
        }
        return tokens.toString();
    }

    public TreeNode deserialize(String data) {
        if (data == null || data.isEmpty()) {
            return null;
        }
        String[] tokens = data.split(",");
        TreeNode root = new TreeNode(Integer.parseInt(tokens[0]));
        Deque<TreeNode> queue = new ArrayDeque<>();
        queue.add(root);
        int index = 1;
        while (!queue.isEmpty() && index < tokens.length) {
            // Consume tokens as child slots in queue order; a marker fills
            // the slot without adding a node to the queue.
            TreeNode node = queue.poll();
            if (index < tokens.length && !"#".equals(tokens[index])) {
                node.left = new TreeNode(Integer.parseInt(tokens[index]));
                queue.add(node.left);
            }
            index++;
            if (index < tokens.length && !"#".equals(tokens[index])) {
                node.right = new TreeNode(Integer.parseInt(tokens[index]));
                queue.add(node.right);
            }
            index++;
        }
        return root;
    }
}
