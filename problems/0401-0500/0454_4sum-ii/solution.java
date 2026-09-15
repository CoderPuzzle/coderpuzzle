import java.util.HashMap;
import java.util.Map;

class Solution {

    public int fourSumCount(int[] nums1, int[] nums2, int[] nums3, int[] nums4) {
        // Meet in the middle: a+b+c+d = 0 iff a+b = -(c+d), so index the
        // first two arrays' pair sums with multiplicities (not a set).
        Map<Integer, Integer> sums = new HashMap<>();
        for (int a : nums1) {
            for (int b : nums2) {
                sums.merge(a + b, 1, Integer::sum);
            }
        }
        int total = 0;
        // Each (c,d) pair adds the number of (a,b) pairs summing to its
        // negation; every zero tuple is counted once via its unique split.
        for (int c : nums3) {
            for (int d : nums4) {
                total += sums.getOrDefault(-(c + d), 0);
            }
        }
        return total;
    }
}
