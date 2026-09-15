import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    public int[][] combinationSum2(int[] candidates, int target) {
        // Sorted copy leaves the caller's array untouched; sorting makes every
        // emitted combination ascending and the left-to-right growth
        // lexicographic.
        int[] arr = candidates.clone();
        Arrays.sort(arr);
        List<int[]> combinations = new ArrayList<>();
        // start moves past each picked index, so every candidate number is
        // used at most once.
        backtrack(arr, 0, target, new ArrayList<>(), combinations);
        return combinations.toArray(new int[0][]);
    }

    private void backtrack(int[] arr, int start, int remaining, List<Integer> current, List<int[]> combinations) {
        if (remaining == 0) {
            // Hit the target exactly: snapshot the current path.
            int[] combination = new int[current.size()];
            for (int i = 0; i < current.size(); i++) combination[i] = current.get(i);
            combinations.add(combination);
            return;
        }
        for (int i = start; i < arr.length; i++) {
            // A value equal to the one just abandoned at this depth would
            // rebuild the same combination, so skip runs of equal values.
            if (i > start && arr[i] == arr[i - 1]) continue;
            // Sorted order means the first value too large to fit ends the
            // loop: every later value is at least as large.
            if (arr[i] > remaining) break;
            current.add(arr[i]);
            // i + 1, not i: every candidate number may be used only once.
            backtrack(arr, i + 1, remaining - arr[i], current, combinations);
            current.remove(current.size() - 1);
        }
    }
}
