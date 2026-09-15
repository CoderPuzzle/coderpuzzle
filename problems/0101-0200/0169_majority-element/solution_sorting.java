import java.util.Arrays;

class Solution {

    public int majorityElement(int[] nums) {
        // Sorted copy leaves the caller's array untouched. The majority's
        // occurrences stand together as one run longer than half the array,
        // and a run that long must cover the middle -- so the value at the
        // halfway index is the majority, whatever the input order was.
        int[] ordered = nums.clone();
        Arrays.sort(ordered);
        return ordered[ordered.length / 2];
    }
}
