import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[][] combinationSum(int[] candidates, int target) {
        List<List<Integer>> results = new ArrayList<>();
        backtrack(candidates, 0, target, new ArrayList<>(), results);
        int[][] out = new int[results.size()][];
        for (int i = 0; i < results.size(); i++) {
            List<Integer> comb = results.get(i);
            int[] arr = new int[comb.size()];
            for (int j = 0; j < comb.size(); j++) {
                arr[j] = comb.get(j);
            }
            out[i] = arr;
        }
        return out;
    }

    private void backtrack(
        int[] candidates,
        int start,
        int remaining,
        List<Integer> path,
        List<List<Integer>> results
    ) {
        // remaining = target minus the sum of the path so far; when it hits 0
        // the path is a valid combination, so record a copy before it mutates.
        if (remaining == 0) {
            results.add(new ArrayList<>(path));
            return;
        }
        // Loop from start onward: everything before start stays forbidden.
        for (int i = start; i < candidates.length; i++) {
            int value = candidates[i];
            // Oversized candidate: let the branch die now rather than one layer
            // deeper. A skip, not a break, since input is unsorted.
            if (value > remaining) continue;
            path.add(value);
            // Recurse with i, not i + 1: a candidate may be reused without
            // limit. This pins every combination to nondecreasing candidate
            // order, so (2, 3, 2) can never form while (2, 2, 3) is found once.
            backtrack(candidates, i, remaining - value, path, results);
            path.remove(path.size() - 1);
        }
    }
}
