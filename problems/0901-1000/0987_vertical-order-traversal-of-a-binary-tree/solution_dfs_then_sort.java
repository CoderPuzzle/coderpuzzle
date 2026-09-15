import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    public int[][] verticalTraversal(TreeNode root) {
        // Pure collector: a root-first DFS (left before right, explicit
        // stack, no recursion) appends one (column, row, value) record per
        // node and keeps no answer structure at all.
        List<int[]> triples = new ArrayList<>();
        Deque<Frame> pending = new ArrayDeque<>();
        if (root != null) {
            pending.push(new Frame(root, 0, 0));
        }
        while (!pending.isEmpty()) {
            Frame frame = pending.pop();
            triples.add(new int[] { frame.col, frame.row, frame.node.val });
            if (frame.node.right != null) pending.push(new Frame(frame.node.right, frame.row + 1, frame.col + 1));
            if (frame.node.left != null) pending.push(new Frame(frame.node.left, frame.row + 1, frame.col - 1));
        }
        // One sort settles every ordering at once: columns left to right,
        // rows top to bottom, and values breaking the ties of nodes that
        // share one cell. The answer is then just runs of equal columns.
        triples.sort((a, b) -> {
            if (a[0] != b[0]) return Integer.compare(a[0], b[0]);
            if (a[1] != b[1]) return Integer.compare(a[1], b[1]);
            return Integer.compare(a[2], b[2]);
        });
        List<int[]> groups = new ArrayList<>();
        int index = 0;
        while (index < triples.size()) {
            int column = triples.get(index)[0];
            int end = index;
            while (end < triples.size() && triples.get(end)[0] == column) {
                end++;
            }
            int[] values = new int[end - index];
            for (int position = 0; position < values.length; position++) {
                values[position] = triples.get(index + position)[2];
            }
            groups.add(values);
            index = end;
        }
        return groups.toArray(new int[0][]);
    }

    // A pending (node, row, column) step of the depth-first walk.
    private static final class Frame {

        final TreeNode node;
        final int row;
        final int col;

        Frame(TreeNode node, int row, int col) {
            this.node = node;
            this.row = row;
            this.col = col;
        }
    }
}
