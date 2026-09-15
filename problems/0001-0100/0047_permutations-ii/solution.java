import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    public int[][] permuteUnique(int[] nums) {
        // Sorted copy leaves the caller's array untouched; sorting makes every
        // position choose among the remaining values in ascending order, so
        // the finished permutations emerge in lexicographic order.
        int[] arr = nums.clone();
        Arrays.sort(arr);
        List<int[]> permutations = new ArrayList<>();
        // One flag per slot: each element is consumed at most once per
        // permutation, cleared again on the way back up.
        backtrack(arr, new boolean[arr.length], new ArrayList<>(), permutations);
        return permutations.toArray(new int[0][]);
    }

    private void backtrack(int[] arr, boolean[] used, List<Integer> current, List<int[]> permutations) {
        if (current.size() == arr.length) {
            // Every position filled: snapshot the finished permutation.
            int[] permutation = new int[current.size()];
            for (int i = 0; i < current.size(); i++) permutation[i] = current.get(i);
            permutations.add(permutation);
            return;
        }
        for (int i = 0; i < arr.length; i++) {
            if (used[i]) continue;
            // A value equal to the one just abandoned at this depth would
            // rebuild the same permutation, so skip runs of equal values: a
            // duplicate may only be placed once its left twin is used.
            if (i > 0 && arr[i] == arr[i - 1] && !used[i - 1]) continue;
            used[i] = true;
            current.add(arr[i]);
            backtrack(arr, used, current, permutations);
            current.remove(current.size() - 1);
            used[i] = false;
        }
    }
}
