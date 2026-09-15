class Solution {

    public int minElements(int[] nums, int limit, int goal) {
        // Only the array's total matters: one added element moves the sum
        // by at most +/-limit, so closing a gap g takes ceil(g / limit).
        // The sum reaches 1e11, so the accumulation and gap are 64-bit;
        // the answer itself stays below 1.1e9 and fits the int return.
        long sum = 0;
        for (int x : nums) sum += x;
        long gap = Math.abs((long) goal - sum);
        return (int) ((gap + limit - 1) / limit);
    }
}
