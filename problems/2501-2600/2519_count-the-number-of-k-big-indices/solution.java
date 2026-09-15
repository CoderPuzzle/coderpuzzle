import java.util.Arrays;

class Solution {

    // Counts, for every index, how many strictly smaller values sit before
    // it, walking one Fenwick tree over the value range.
    private static int[] smallerCounts(int[] values) {
        int bound = Arrays.stream(values).max().getAsInt();
        int[] tree = new int[bound + 1];
        int[] counts = new int[values.length];
        for (int i = 0; i < values.length; ++i) {
            for (int j = values[i] - 1; j > 0; j -= j & -j) counts[i] += tree[j];
            for (int j = values[i]; j <= bound; j += j & -j) tree[j] += 1;
        }
        return counts;
    }

    public int kBigIndices(int[] nums, int k) {
        // Two Fenwick sweeps over the value range answer, for every index,
        // how many strictly smaller values sit on each side: a forward pass
        // fills the left counts and a backward pass reruns the same helper
        // on a fresh tree for the right ones. An index is k-big exactly
        // when both counts reach k.
        int[] left = smallerCounts(nums);
        int[] reversed = new int[nums.length];
        for (int i = 0; i < nums.length; ++i) reversed[i] = nums[nums.length - 1 - i];
        int[] right = smallerCounts(reversed);
        int big = 0;
        for (int i = 0; i < nums.length; ++i) if (left[i] >= k && right[nums.length - 1 - i] >= k) ++big;
        return big;
    }
}
