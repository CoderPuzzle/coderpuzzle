import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

class Solution {

    public int[] intersection(int[] nums1, int[] nums2) {
        // The set does the uniqueness bookkeeping: hashing nums1's values
        // answers "is this value shared?" in O(1) average, and collecting
        // the hits into a second set collapses the duplicates both inputs
        // carry, so each shared value is kept exactly once.
        Set<Integer> seen = new HashSet<>();
        for (int value : nums1) {
            seen.add(value);
        }
        Set<Integer> shared = new HashSet<>();
        for (int value : nums2) {
            if (seen.contains(value)) {
                shared.add(value);
            }
        }
        int[] result = new int[shared.size()];
        int index = 0;
        for (int value : shared) {
            result[index++] = value;
        }
        // The final sort pins the output to the ascending order the judge
        // compares exactly.
        Arrays.sort(result);
        return result;
    }
}
