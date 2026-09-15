import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public boolean validateBinaryTreeNodes(int n, int[] leftChild, int[] rightChild) {
        // At most one parent each, exactly one root, and full reachability
        // from that root: together necessary and sufficient.
        int[] indegree = new int[n];
        for (int[] children : new int[][] { leftChild, rightChild }) {
            for (int child : children) {
                if (child != -1) {
                    ++indegree[child];
                }
            }
        }
        int root = -1;
        int roots = 0;
        for (int i = 0; i < n; ++i) {
            if (indegree[i] == 0) {
                root = i;
                ++roots;
            } else if (indegree[i] > 1) {
                return false;
            }
        }
        if (roots != 1) {
            return false;
        }
        boolean[] seen = new boolean[n];
        seen[root] = true;
        Deque<Integer> queue = new ArrayDeque<>();
        queue.add(root);
        int visited = 1;
        while (!queue.isEmpty()) {
            int node = queue.remove();
            for (int child : new int[] { leftChild[node], rightChild[node] }) {
                if (child != -1 && !seen[child]) {
                    seen[child] = true;
                    ++visited;
                    queue.add(child);
                }
            }
        }
        return visited == n;
    }
}
