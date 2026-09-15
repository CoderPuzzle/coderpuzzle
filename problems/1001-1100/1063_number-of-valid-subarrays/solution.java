class Solution {

    public long validSubarrays(int[] nums) {
        int n = nums.length;
        long total = 0;
        int[] stack = new int[n + 1];
        int top = 0;
        for (int i = 0; i <= n; i++) {
            int current = i == n ? -1 : nums[i];
            while (top > 0 && nums[stack[top - 1]] > current) {
                int j = stack[--top];
                total += i - j;
            }
            stack[top++] = i;
        }
        return total;
    }
}
