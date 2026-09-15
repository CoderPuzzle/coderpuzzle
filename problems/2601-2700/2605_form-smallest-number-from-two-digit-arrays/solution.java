import java.util.HashSet;
import java.util.Set;

class Solution {

    public int minNumber(int[] nums1, int[] nums2) {
        // A shared digit admits a one-digit number; the smallest shared digit
        // then beats anything with more digits.
        Set<Integer> inSecond = new HashSet<>();
        for (int d : nums2) {
            inSecond.add(d);
        }
        int common = Integer.MAX_VALUE;
        for (int d : nums1) {
            if (inSecond.contains(d) && d < common) {
                common = d;
            }
        }
        if (common != Integer.MAX_VALUE) {
            return common;
        }
        // No overlap: the answer has two digits, and the tens digit is just
        // whichever array holds the globally smaller minimum.
        int a = Integer.MAX_VALUE;
        int b = Integer.MAX_VALUE;
        for (int d : nums1) {
            a = Math.min(a, d);
        }
        for (int d : nums2) {
            b = Math.min(b, d);
        }
        return Math.min(10 * a + b, 10 * b + a);
    }
}
