class Solution {

    public int subarraysWithMoreOnesThanZeroes(int[] nums) {
        final long mod = 1_000_000_007L;
        int size = 2 * nums.length + 3;
        int offset = nums.length + 1;
        int[] bit = new int[size];

        add(bit, offset);
        int prefix = 0;
        long answer = 0;
        for (int value : nums) {
            prefix += value == 1 ? 1 : -1;
            int index = prefix + offset;
            answer = (answer + query(bit, index - 1)) % mod;
            add(bit, index);
        }
        return (int) answer;
    }

    private void add(int[] bit, int index) {
        while (index < bit.length) {
            bit[index]++;
            index += index & -index;
        }
    }

    private int query(int[] bit, int index) {
        int total = 0;
        while (index > 0) {
            total += bit[index];
            index -= index & -index;
        }
        return total;
    }
}
