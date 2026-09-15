class Solution {

    public int[] sortColors(int[] nums) {
        // With only three keys the multiset fixes the output, so tally each
        // color into a slot indexed by the value itself.
        int[] counts = new int[3];
        for (int value : nums) {
            counts[value]++;
        }
        // Overwrite pass: emitting blocks 0,1,2 in order partitions nums;
        // safe because the tally above already captured every element.
        int index = 0;
        for (int color = 0; color < 3; color++) {
            for (int c = 0; c < counts[color]; c++) {
                nums[index++] = color;
            }
        }
        return nums;
    }
}
