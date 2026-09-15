import java.util.HashSet;
import java.util.Set;

class Solution {

    public int[] distinctDifferenceArray(int[] nums) {
        // One right-to-left pass records how many distinct values survive
        // after each index, then a left-to-right pass grows the prefix set,
        // so every answer is a single subtraction of two maintained counts.
        int n = nums.length;
        int[] suffixDistinct = new int[n];
        Set<Integer> seen = new HashSet<>();
        for (int i = n - 1; i >= 0; --i) {
            // Visited values are exactly those right of i, so this records
            // the distinct count of nums[i + 1, ..., n - 1] itself.
            suffixDistinct[i] = seen.size();
            seen.add(nums[i]);
        }
        Set<Integer> prefixSeen = new HashSet<>();
        int[] result = new int[n];
        for (int i = 0; i < n; ++i) {
            prefixSeen.add(nums[i]);
            result[i] = prefixSeen.size() - suffixDistinct[i];
        }
        return result;
    }
}
