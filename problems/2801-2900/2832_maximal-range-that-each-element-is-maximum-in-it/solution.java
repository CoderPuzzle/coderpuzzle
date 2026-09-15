class Solution {

    public int[] maximumLengthOfRanges(int[] nums) {
        int n = nums.length;
        int[] left = new int[n]; // nearest index with a greater element on the left, +1
        int[] stack = new int[n];
        int top = 0;
        for (int i = 0; i < n; i++) {
            while (top > 0 && nums[stack[top - 1]] < nums[i]) top--;
            left[i] = top > 0 ? stack[top - 1] + 1 : 0;
            stack[top++] = i;
        }
        int[] right = new int[n]; // nearest index with a greater element on the right, -1
        top = 0;
        for (int i = n - 1; i >= 0; i--) {
            while (top > 0 && nums[stack[top - 1]] < nums[i]) top--;
            right[i] = top > 0 ? stack[top - 1] - 1 : n - 1;
            stack[top++] = i;
        }
        int[] result = new int[n];
        for (int i = 0; i < n; i++) result[i] = right[i] - left[i] + 1;
        return result;
    }
}
