class Solution {

    public int[] countSmaller(int[] nums) {
        final int offset = 10002; // maps nums[i] in [-10^4, 10^4] to a positive index
        final int size = 20005;
        int[] bit = new int[size + 1];

        int[] result = new int[nums.length];
        for (int k = nums.length - 1; k >= 0; k--) {
            int index = nums[k] + offset;
            result[k] = query(bit, index - 1);
            update(bit, size, index, 1);
        }
        return result;
    }

    private void update(int[] bit, int size, int i, int delta) {
        while (i <= size) {
            bit[i] += delta;
            i += i & -i;
        }
    }

    private int query(int[] bit, int i) {
        int total = 0;
        while (i > 0) {
            total += bit[i];
            i -= i & -i;
        }
        return total;
    }
}
