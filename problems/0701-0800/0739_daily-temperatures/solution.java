import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public int[] dailyTemperatures(int[] temperatures) {
        int n = temperatures.length;
        int[] answer = new int[n];
        // Stack of days still waiting for a warmer one; their temperatures
        // are non-increasing bottom to top. Unanswered days keep answer 0.
        Deque<Integer> stack = new ArrayDeque<>();
        for (int day = 0; day < n; day++) {
            int temp = temperatures[day];
            // Strictly warmer today resolves each waiting day on top; equal
            // temperatures leave them waiting (strict < comparison).
            while (!stack.isEmpty() && temperatures[stack.peekLast()] < temp) {
                int previous = stack.pollLast();
                answer[previous] = day - previous;
            }
            stack.addLast(day);
        }
        return answer;
    }
}
