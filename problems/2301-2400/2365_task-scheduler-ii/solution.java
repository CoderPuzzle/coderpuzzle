import java.util.HashMap;
import java.util.Map;

class Solution {

    public long taskSchedulerII(int[] tasks, int space) {
        // Greedily complete each task on the earliest legal day: breaks only
        // ever help by making a later same-type task legal sooner. Jump the
        // clock to last[type] + space + 1 when the next task is still
        // blocked; totals reach ~1e10, so run in 64 bits.
        Map<Integer, Long> lastDay = new HashMap<>();
        long day = 0;
        for (int task : tasks) {
            Long previous = lastDay.get(task);
            if (previous != null) {
                day = Math.max(day + 1, previous + space + 1L);
            } else {
                ++day;
            }
            lastDay.put(task, day);
        }
        return day;
    }
}
