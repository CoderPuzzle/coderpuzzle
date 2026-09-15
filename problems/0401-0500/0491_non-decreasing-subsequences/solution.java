import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

class Solution {

    public int[][] findSubsequences(int[] nums) {
        // One decision per index — take the value or skip it — so every leaf
        // of the tree is exactly one subset of indices. A leaf holding at
        // least two non-decreasing values is one answer; equal values reach
        // the same value sequence through different index subsets, so a set
        // absorbs those duplicates and the final sort emits the pinned
        // lexicographic order.
        Set<List<Integer>> found = new HashSet<>();
        walk(nums, 0, new ArrayList<>(), found);
        List<List<Integer>> sequences = new ArrayList<>(found);
        sequences.sort(Solution::compare);
        int[][] results = new int[sequences.size()][];
        for (int i = 0; i < sequences.size(); i++) {
            List<Integer> sequence = sequences.get(i);
            int[] row = new int[sequence.size()];
            for (int j = 0; j < sequence.size(); j++) {
                row[j] = sequence.get(j);
            }
            results[i] = row;
        }
        return results;
    }

    private void walk(int[] nums, int index, List<Integer> current, Set<List<Integer>> found) {
        if (index == nums.length) {
            if (current.size() >= 2) {
                found.add(new ArrayList<>(current));
            }
            return;
        }
        // Take nums[index] when it does not decrease.
        if (current.isEmpty() || nums[index] >= current.get(current.size() - 1)) {
            current.add(nums[index]);
            walk(nums, index + 1, current, found);
            current.remove(current.size() - 1);
        }
        // Skip nums[index].
        walk(nums, index + 1, current, found);
    }

    private static int compare(List<Integer> left, List<Integer> right) {
        int shared = Math.min(left.size(), right.size());
        for (int i = 0; i < shared; i++) {
            int difference = left.get(i) - right.get(i);
            if (difference != 0) {
                return difference;
            }
        }
        return left.size() - right.size();
    }
}
