class Solution {

    // Every value sits below 2^maximumBit, so the running XOR does too,
    // and XOR with a fixed prefix is a bijection on that range: the
    // maximum of prefix ^ k is reached exactly at k = mask ^ prefix,
    // where mask = 2^maximumBit - 1. Removing the last element just
    // XORs it back out of the running total, so one backward walk
    // answers every prefix without recomputing anything.
    public int[] getMaximumXor(int[] nums, int maximumBit) {
        int mask = (1 << maximumBit) - 1;
        int running = 0;
        for (int value : nums) running ^= value;
        int[] answer = new int[nums.length];
        int j = 0;
        for (int i = nums.length - 1; i >= 0; i--) {
            answer[j++] = running ^ mask;
            running ^= nums[i];
        }
        return answer;
    }
}
