import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    public int[][] subsetsWithDup(int[] nums) {
        // Sorted copy leaves the caller's array untouched; sorting makes each
        // branch choose among the remaining values in ascending order, so the
        // subsets emerge in the pinned ascending lexicographic order.
        int[] values = nums.clone();
        Arrays.sort(values);
        List<int[]> subsets = new ArrayList<>();
        backtrack(values, 0, new ArrayList<>(), subsets);
        return subsets.toArray(new int[0][]);
    }

    private void backtrack(int[] values, int start, List<Integer> current, List<int[]> subsets) {
        // Every node of the walk is itself a subset: the root is [].
        int[] subset = new int[current.size()];
        for (int i = 0; i < current.size(); i++) subset[i] = current.get(i);
        subsets.add(subset);
        for (int i = start; i < values.length; i++) {
            // A value equal to the sibling just tried at this level would
            // rebuild the same subset, so skip runs of equal values: only the
            // first copy of a run may open a branch here.
            if (i > start && values[i] == values[i - 1]) continue;
            current.add(values[i]);
            backtrack(values, i + 1, current, subsets);
            current.remove(current.size() - 1);
        }
    }
}
