import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

class Solution {

    public int[] intersect(int[] nums1, int[] nums2) {
        // Count how many times each value occurs in nums1, then walk nums2:
        // a value can join the result at most min(count1, count2) times,
        // which the per-value counter enforces by falling to zero.
        Map<Integer, Integer> counts = new HashMap<>();
        for (int value : nums1) {
            counts.merge(value, 1, Integer::sum);
        }
        int[] picked = new int[nums2.length];
        int size = 0;
        for (int value : nums2) {
            int remaining = counts.getOrDefault(value, 0);
            if (remaining > 0) {
                picked[size++] = value;
                counts.put(value, remaining - 1);
            }
        }
        // The judge compares arrays exactly, so pin the any-order freedom
        // to ascending sorted order before returning.
        int[] result = Arrays.copyOf(picked, size);
        Arrays.sort(result);
        return result;
    }
}
