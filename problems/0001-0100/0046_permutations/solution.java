import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    public int[][] permute(int[] nums) {
        // Sorted copy leaves the caller's array untouched; trying candidates in
        // ascending order makes the walk emit lexicographic order directly.
        int[] values = nums.clone();
        Arrays.sort(values);
        List<int[]> permutations = new ArrayList<>();
        boolean[] used = new boolean[values.length];
        walk(values, used, new int[values.length], 0, permutations);
        return permutations.toArray(new int[0][]);
    }

    // A leaf has one chosen element per position: a full permutation. Marks
    // replace an O(n) membership scan.
    private void walk(int[] values, boolean[] used, int[] current, int depth, List<int[]> permutations) {
        if (depth == values.length) {
            // Copy: current is the shared buffer for the next branch.
            permutations.add(current.clone());
            return;
        }
        for (int index = 0; index < values.length; index++) {
            if (used[index]) continue;
            used[index] = true;
            current[depth] = values[index];
            walk(values, used, current, depth + 1, permutations);
            used[index] = false;
        }
    }
}
