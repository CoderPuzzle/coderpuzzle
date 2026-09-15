import java.util.Arrays;
import java.util.Comparator;

class Solution {

    public long minimumEffort(int[][] tasks) {
        // Order by slack (minimum - actual) descending: a high-slack task
        // done early banks its surplus while the budget is still high —
        // exchange arguments show an adjacent inversion never helps.
        Arrays.sort(tasks, (a, b) -> Integer.compare(b[1] - b[0], a[1] - a[0]));
        long spent = 0;
        long answer = 0;
        for (int[] task : tasks) {
            int actual = task[0];
            int minimum = task[1];
            // Each task needs current energy >= its minimum, so the answer
            // is the largest prefix requirement; only `actual` is consumed.
            answer = Math.max(answer, spent + minimum);
            spent += actual;
        }
        return answer;
    }
}
