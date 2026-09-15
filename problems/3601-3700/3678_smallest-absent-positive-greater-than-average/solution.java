import java.util.HashSet;
import java.util.Set;

class Solution {

    public int smallestAbsent(int[] nums) {
        // A hash set turns "is candidate c present in nums?" into an O(1)
        // lookup, so the answer is found by walking upward from 1.
        Set<Integer> present = new HashSet<>();
        long total = 0;
        for (int value : nums) {
            present.add(value);
            total += value;
        }
        int n = nums.length;
        // Skip candidates at or below the average: candidate > total/n is
        // tested as candidate * n > total, an exact integer comparison --
        // equality fails it, so an integral average excludes itself. The
        // walk starts at 1 because the answer must be positive. The sum is
        // accumulated in 64 bits even though it fits in 32 here.
        long candidate = 1;
        while (candidate * n <= total) {
            candidate++;
        }
        while (present.contains((int) candidate)) {
            candidate++;
        }
        return (int) candidate;
    }
}
