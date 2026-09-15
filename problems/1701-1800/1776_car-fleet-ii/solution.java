import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public double[] getCollisionTimes(int[][] cars) {
        int n = cars.length;
        double[] answer = new double[n];
        java.util.Arrays.fill(answer, -1.0);
        Deque<Integer> stack = new ArrayDeque<>();
        // Right-to-left scan; the stack holds cars still free-wheeling, the
        // possible first collisions for everything to their left.
        for (int i = n - 1; i >= 0; i--) {
            int position = cars[i][0],
                speed = cars[i][1];
            // A car at least as fast ahead can never be caught — pop it.
            while (!stack.isEmpty() && speed <= cars[stack.peek()][1]) {
                stack.pop();
            }
            while (!stack.isEmpty()) {
                int j = stack.peek();
                // When i would reach j, assuming j keeps its speed.
                double t = (double) (cars[j][0] - position) / (speed - cars[j][1]);
                // If j merges earlier, it has slowed before i arrives: it is
                // no first collision for i (nor for anyone further left), so
                // pop permanently and try the next candidate.
                if (answer[j] > 0 && t >= answer[j]) {
                    stack.pop();
                } else {
                    answer[i] = t;
                    break;
                }
            }
            stack.push(i);
        }
        return answer;
    }
}
