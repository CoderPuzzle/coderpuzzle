import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

class Solution {

    public List<List<Integer>> findDifference(int[] nums1, int[] nums2) {
        // Set membership answers "present in the other array" in O(1); the
        // surviving distinct values are emitted ascending for judging.
        Set<Integer> set1 = new HashSet<>();
        for (int value : nums1) {
            set1.add(value);
        }
        Set<Integer> set2 = new HashSet<>();
        for (int value : nums2) {
            set2.add(value);
        }
        List<List<Integer>> answer = new ArrayList<>();
        answer.add(distinctSorted(nums1, set2));
        answer.add(distinctSorted(nums2, set1));
        return answer;
    }

    private List<Integer> distinctSorted(int[] source, Set<Integer> other) {
        Set<Integer> kept = new HashSet<>();
        for (int value : source) {
            if (!other.contains(value)) {
                kept.add(value);
            }
        }
        List<Integer> sorted = new ArrayList<>(kept);
        Collections.sort(sorted);
        return sorted;
    }
}
