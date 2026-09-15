class Solution {

    public int majorityElement(int[] nums) {
        // Boyer-Moore voting: one candidate, one counter. A match raises the
        // counter, a mismatch spends it; at zero the candidate is swapped for
        // the current element.
        int candidate = nums[0];
        int count = 0;
        for (int value : nums) {
            if (count == 0) candidate = value;
            count += value == candidate ? 1 : -1;
        }
        // Every cancellation removes one majority and one minority element, and
        // the majority holds more than half the array, so it always survives.
        return candidate;
    }
}
