import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[][] combine(int n, int k) {
        List<int[]> combinations = new ArrayList<>();
        walk(n, k, 1, new int[k], 0, combinations);
        return combinations.toArray(new int[0][]);
    }

    // Ascending start values make each combination ascending and the walk
    // emit lexicographic order directly.
    private void walk(int n, int k, int start, int[] current, int depth, List<int[]> combinations) {
        // A full pick of k numbers is one combination.
        if (depth == k) {
            // Copy: current is the shared buffer for the next branch.
            combinations.add(current.clone());
            return;
        }
        // The bound keeps only values that leave enough larger numbers to
        // fill the rest of the combination.
        int last = n - (k - depth) + 1;
        for (int value = start; value <= last; value++) {
            current[depth] = value;
            walk(n, k, value + 1, current, depth + 1, combinations);
        }
    }
}
