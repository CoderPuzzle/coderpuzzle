import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[][] verticalOrder(TreeNode root) {
        // Pure collector: a root-first DFS (left before right) appends one
        // (column, row, value) record per node and defers all ordering to a
        // single sort afterwards.
        List<int[]> triples = new ArrayList<>();
        walk(root, 0, 0, triples);
        // List.sort is stable, and the key stops at (column, row): within
        // one cell the records keep their walk order, and a left-before-
        // right walk visits same-depth nodes exactly in the statement's
        // left-to-right reading order — the value must not take part.
        triples.sort((a, b) -> {
            if (a[0] != b[0]) return Integer.compare(a[0], b[0]);
            return Integer.compare(a[1], b[1]);
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

    private void walk(TreeNode node, int row, int col, List<int[]> triples) {
        if (node == null) {
            return;
        }
        triples.add(new int[] { col, row, node.val });
        walk(node.left, row + 1, col - 1, triples);
        walk(node.right, row + 1, col + 1, triples);
    }
}
