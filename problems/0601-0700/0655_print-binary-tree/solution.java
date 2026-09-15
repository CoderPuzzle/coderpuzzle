import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;

class Solution {

    public String[][] printTree(TreeNode root) {
        // The layout is pinned before any cell is written: rows = height + 1,
        // columns = 2^(height+1) - 1, children stepping 2^(height-r-1) columns
        // sideways of their parent. So a first pass measures the tree's
        // height — in edges, the unit the formulas are stated in — on an
        // explicit stack of node/depth pairs: the placement formulas consume
        // it, so guessing it wrong would shift every cell in the grid.
        int height = 0;
        Deque<TreeNode> nodes = new ArrayDeque<>();
        Deque<Integer> depths = new ArrayDeque<>();
        nodes.push(root);
        depths.push(0);
        while (!nodes.isEmpty()) {
            TreeNode node = nodes.pop();
            int depth = depths.pop();
            if (depth > height) {
                height = depth;
            }
            if (node.left != null) {
                nodes.push(node.left);
                depths.push(depth + 1);
            }
            if (node.right != null) {
                nodes.push(node.right);
                depths.push(depth + 1);
            }
        }
        // Second pass: the grid is born as every cell "", the root goes to
        // the exact middle of the top row, and untouched cells simply keep
        // their "" — the empties are the layout: the matrix is as wide as
        // the deepest path alone, not as the node count.
        int rows = height + 1;
        int cols = (1 << (height + 1)) - 1;
        String[][] res = new String[rows][cols];
        for (String[] row : res) {
            Arrays.fill(row, "");
        }
        Deque<TreeNode> toPlace = new ArrayDeque<>();
        Deque<int[]> spots = new ArrayDeque<>();
        toPlace.push(root);
        spots.push(new int[] { 0, (cols - 1) / 2 });
        while (!toPlace.isEmpty()) {
            TreeNode node = toPlace.pop();
            int[] spot = spots.pop();
            int r = spot[0];
            int c = spot[1];
            res[r][c] = String.valueOf(node.val);
            if (node.left != null || node.right != null) {
                // An internal node always sits above the last row, so the
                // exponent height - r - 1 is never negative.
                int offset = 1 << (height - r - 1);
                if (node.left != null) {
                    toPlace.push(node.left);
                    spots.push(new int[] { r + 1, c - offset });
                }
                if (node.right != null) {
                    toPlace.push(node.right);
                    spots.push(new int[] { r + 1, c + offset });
                }
            }
        }
        return res;
    }
}
