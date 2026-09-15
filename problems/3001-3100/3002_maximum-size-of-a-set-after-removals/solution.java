import java.util.HashSet;
import java.util.Set;

class Solution {

    public int maximumSetSize(int[] nums1, int[] nums2) {
        Set<Integer> s1 = new HashSet<>();
        for (int v : nums1) {
            s1.add(v);
        }
        Set<Integer> s2 = new HashSet<>();
        for (int v : nums2) {
            s2.add(v);
        }

        // Count values unique to each side and the shared remainder.
        int only1 = 0;
        for (int v : s1) {
            if (!s2.contains(v)) {
                only1++;
            }
        }
        int only2 = 0;
        for (int v : s2) {
            if (!s1.contains(v)) {
                only2++;
            }
        }
        int common = s1.size() - only1;

        // Each side spends its slots on unique values first; leftover slots
        // add at most one new element each, and only common values qualify,
        // each counting once no matter which side inserts it.
        int half = nums1.length / 2;
        int a = Math.min(half, only1);
        int b = Math.min(half, only2);
        return a + b + Math.min(common, nums1.length - a - b);
    }
}
