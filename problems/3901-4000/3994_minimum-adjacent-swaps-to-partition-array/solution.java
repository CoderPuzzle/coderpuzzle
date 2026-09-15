class Solution {

    public int minAdjacentSwaps(int[] nums, int a, int b) {
        long modulus = 1_000_000_007L;
        long[] counts = new long[3];
        long answer = 0;
        for (int value : nums) {
            int group = value < a ? 0 : value <= b ? 1 : 2;
            if (group == 0) answer += counts[1] + counts[2];
            else if (group == 1) answer += counts[2];
            counts[group]++;
        }
        return (int) (answer % modulus);
    }
}
