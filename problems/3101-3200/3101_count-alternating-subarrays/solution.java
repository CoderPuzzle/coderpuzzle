class Solution {

    public long countAlternatingSubarrays(int[] nums) {
        // The answer reaches n * (n + 1) / 2 = 5,000,050,000 at the
        // bounds, past what an int can hold, so accumulate in a long.
        long count = 0L;
        long current = 0L;
        for (int index = 0; index < nums.length; index++) {
            if (index > 0 && nums[index] == nums[index - 1]) {
                current = 1L;
            } else {
                current += 1L;
            }
            count += current;
        }
        return count;
    }
}
