import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;

class Solution {

    public int maxTaskAssign(int[] tasks, int[] workers, int pills, int strength) {
        Arrays.sort(tasks);
        Arrays.sort(workers);
        int low = 0;
        int high = Math.min(tasks.length, workers.length) + 1;
        while (low + 1 < high) {
            int middle = low + (high - low) / 2;
            if (feasible(tasks, workers, pills, strength, middle)) {
                low = middle;
            } else {
                high = middle;
            }
        }
        return low;
    }

    private boolean feasible(int[] tasks, int[] workers, int pills, int strength, int count) {
        Deque<Integer> available = new ArrayDeque<>();
        int taskIndex = 0;
        for (int workerIndex = workers.length - count; workerIndex < workers.length; workerIndex++) {
            int worker = workers[workerIndex];
            while (taskIndex < count && tasks[taskIndex] <= (long) worker + strength) {
                available.addLast(tasks[taskIndex++]);
            }
            if (available.isEmpty()) {
                return false;
            }
            if (available.peekFirst() <= worker) {
                available.removeFirst();
            } else {
                if (pills == 0) {
                    return false;
                }
                pills--;
                available.removeLast();
            }
        }
        return true;
    }
}
