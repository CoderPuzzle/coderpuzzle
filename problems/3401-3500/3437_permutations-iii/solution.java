import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[][] permute(int n) {
        List<int[]> results = new ArrayList<>();
        walk(n, 0, new int[n], new boolean[n + 1], results);
        return results.toArray(new int[0][]);
    }

    // Ascending candidates make the walk emit lexicographic order directly;
    // the parity test prunes a branch the moment it would place two adjacent
    // elements both odd or both even.
    private void walk(int n, int depth, int[] current, boolean[] used, List<int[]> results) {
        // Every position filled: snapshot the finished permutation.
        if (depth == n) {
            // Copy: current is the shared buffer for the next branch.
            results.add(current.clone());
            return;
        }
        for (int value = 1; value <= n; ++value) {
            if (used[value]) {
                continue;
            }
            if (depth > 0 && value % 2 == current[depth - 1] % 2) {
                continue;
            }
            used[value] = true;
            current[depth] = value;
            walk(n, depth + 1, current, used, results);
            used[value] = false;
        }
    }
}
