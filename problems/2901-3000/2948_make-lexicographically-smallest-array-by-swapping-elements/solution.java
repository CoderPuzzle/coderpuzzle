import java.util.Arrays;

class Solution {

    public int[] lexicographicallySmallestArray(int[] nums, int limit) {
        int n = nums.length;
        // Sort indices by value so components become contiguous runs.
        Integer[] idx = new Integer[n];
        for (int i = 0; i < n; i++) idx[i] = i;
        Arrays.sort(idx, (a, b) -> nums[a] != nums[b] ? Integer.compare(nums[a], nums[b]) : Integer.compare(a, b));
        int[] result = new int[n];
        int i = 0;
        while (i < n) {
            // A maximal run whose consecutive value gaps are all <= limit is
            // exactly one connected component; any larger gap splits it.
            int j = i;
            while (j + 1 < n && nums[idx[j + 1]] - nums[idx[j]] <= limit) j++;
            // Within a component any permutation is reachable, so place the
            // run's ascending values at its original indices in ascending order.
            int len = j - i + 1;
            int[] indices = new int[len];
            for (int p = 0; p < len; p++) indices[p] = idx[i + p];
            Arrays.sort(indices);
            for (int p = 0; p < len; p++) {
                result[indices[p]] = nums[idx[i + p]];
            }
            i = j + 1;
        }
        return result;
    }
}
