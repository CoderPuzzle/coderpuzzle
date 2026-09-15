import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashMap;
import java.util.Map;

class Solution {

    public int[] anagramMappings(int[] nums1, int[] nums2) {
        // Each element of nums1 must land on an index of nums2 that holds
        // the same value, and with repeats no index can serve two elements.
        // One pass files every value's indices in nums2 into a queue, left
        // to right; the second walk hands each element of nums1 the front
        // of its queue and pops it, so every copy takes the leftmost
        // position not claimed by an earlier copy.
        Map<Integer, Deque<Integer>> positions = new HashMap<>();
        for (int index = 0; index < nums2.length; ++index) {
            positions.computeIfAbsent(nums2[index], key -> new ArrayDeque<>()).add(index);
        }
        int[] mapping = new int[nums1.length];
        for (int index = 0; index < nums1.length; ++index) {
            mapping[index] = positions.get(nums1[index]).poll();
        }
        return mapping;
    }
}
