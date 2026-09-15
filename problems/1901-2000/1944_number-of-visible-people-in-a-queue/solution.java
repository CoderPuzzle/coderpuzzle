import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public int[] canSeePersonsCount(int[] heights) {
        int n = heights.length;
        int[] answer = new int[n];
        // Scan right-to-left; the stack holds exactly the people visible to
        // a shorter person arriving from the left (heights increasing top-down).
        Deque<Integer> stack = new ArrayDeque<>();
        for (int i = n - 1; i >= 0; i--) {
            int seen = 0;
            // Each popped person is shorter and has only shorter people
            // between themselves and i, so i sees them. Strict < suffices
            // because all heights are distinct.
            while (!stack.isEmpty() && stack.peek() < heights[i]) {
                stack.pop();
                seen++;
            }
            // If anything remains, its top is the first person right of i
            // taller than i: visible across the popped people, and it blocks
            // everyone beyond it. Popped entries stay discarded -- i shadows
            // them for anyone further left.
            answer[i] = seen + (stack.isEmpty() ? 0 : 1);
            stack.push(heights[i]);
        }
        // Each index is pushed and popped at most once: linear in total.
        return answer;
    }
}
