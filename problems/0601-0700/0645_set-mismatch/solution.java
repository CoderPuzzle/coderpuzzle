class Solution {

    public int[] findErrorNums(int[] nums) {
        // The values in nums are the numbers 1..n with one value doubled and
        // one lost, so counting occurrences settles both questions at once:
        // slot v of a count array indexed by value holds 2 for the
        // duplicated value and 0 for the missing one.
        int[] counts = new int[nums.length + 1];
        for (int value : nums) {
            counts[value]++;
        }
        // One sweep over the value range 1..n reads the counts back; every
        // other slot holds 1 and carries no information, so exactly one
        // duplicate and one gap are found.
        int duplicate = 0;
        int missing = 0;
        for (int value = 1; value <= nums.length; ++value) {
            if (counts[value] == 2) {
                duplicate = value;
            } else if (counts[value] == 0) {
                missing = value;
            }
        }
        return new int[] { duplicate, missing };
    }
}
