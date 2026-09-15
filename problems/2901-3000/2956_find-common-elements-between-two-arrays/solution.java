import java.util.HashSet;
import java.util.Set;

class Solution {

    public int[] findIntersectionValues(int[] nums1, int[] nums2) {
        // answer1 counts indices whose value exists anywhere in the other
        // array; existence, not multiplicity, is what matters, so the only
        // state needed is each array's set of distinct values.
        Set<Integer> set1 = new HashSet<>();
        Set<Integer> set2 = new HashSet<>();
        for (int x : nums1) set1.add(x);
        for (int y : nums2) set2.add(y);
        int answer1 = 0;
        for (int x : nums1) {
            if (set2.contains(x)) ++answer1;
        }
        int answer2 = 0;
        for (int y : nums2) {
            if (set1.contains(y)) ++answer2;
        }
        return new int[] { answer1, answer2 };
    }
}
