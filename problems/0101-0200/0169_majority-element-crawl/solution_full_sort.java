import java.util.Arrays;

class Solution {

    public int majorityElement(int[] nums) {
        // Sorting turns the count into a position: equal values form one run,
        // the majority's run is longer than half the array, and a run that
        // long always covers the middle index n / 2. The sort runs on a clone
        // so the caller's array is left untouched.
        int[] ordered = nums.clone();
        Arrays.sort(ordered);
        // Whatever order the input arrived in, the middle of the sorted order
        // is the majority.
        return ordered[ordered.length / 2];
    }
}
