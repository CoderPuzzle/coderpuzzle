import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[] pivotArray(int[] nums, int pivot) {
        // Stable three-way partition: gather each comparison class in its
        // original order and concatenate, which preserves the relative order
        // inside the less and greater groups by construction.
        List<Integer> less = new ArrayList<>();
        List<Integer> equal = new ArrayList<>();
        List<Integer> greater = new ArrayList<>();
        for (int value : nums) {
            if (value < pivot) {
                less.add(value);
            } else if (value > pivot) {
                greater.add(value);
            } else {
                equal.add(value);
            }
        }
        int[] result = new int[nums.length];
        int at = 0;
        for (int value : less) {
            result[at++] = value;
        }
        for (int value : equal) {
            result[at++] = value;
        }
        for (int value : greater) {
            result[at++] = value;
        }
        return result;
    }
}
