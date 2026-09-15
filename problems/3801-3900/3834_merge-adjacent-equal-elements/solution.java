import java.util.Arrays;

class Solution {

    public long[] mergeAdjacent(int[] nums) {
        // Scan left to right keeping a stack of settled elements; when the incoming
        // value equals the top, merge them into their sum and keep cascading left
        // while the new sum equals the new top — the final stack is the answer.
        long[] stack = new long[nums.length];
        int top = 0;
        for (int value : nums) {
            if (top > 0 && stack[top - 1] == value) {
                long merged = stack[--top] + value;
                while (top > 0 && stack[top - 1] == merged) {
                    merged += stack[--top];
                }
                stack[top++] = merged;
            } else {
                stack[top++] = value;
            }
        }
        return Arrays.copyOf(stack, top);
    }
}
