import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashMap;
import java.util.Map;
import java.util.PriorityQueue;

class Solution {

    public int leastInterval(String[] tasks, int n) {
        Map<String, Integer> counts = new HashMap<>();
        for (String t : tasks) {
            counts.merge(t, 1, Integer::sum);
        }
        // Max-heap of remaining counts for labels free to run right now; only
        // the counts matter, because the cooldown rule treats every label
        // alike.
        PriorityQueue<Integer> ready = new PriorityQueue<>((a, b) -> Integer.compare(b, a));
        for (int v : counts.values()) {
            ready.add(v);
        }
        // FIFO of runs still cooling: [slot when the label may run again,
        // remaining count]. Free slots arrive in order, so the front pops.
        Deque<int[]> cooling = new ArrayDeque<>();
        int time = 0;
        while (!ready.isEmpty() || !cooling.isEmpty()) {
            // Release everything whose cooldown has expired by now.
            while (!cooling.isEmpty() && cooling.peek()[0] <= time) {
                ready.add(cooling.poll()[1]);
            }
            if (ready.isEmpty()) {
                // Nothing can run: jump the clock straight to the next
                // release instead of counting idle slots one by one.
                time = cooling.peek()[0];
                continue;
            }
            // Run one job of the largest remaining count.
            int top = ready.poll();
            if (top > 1) {
                cooling.add(new int[] { time + n + 1, top - 1 });
            }
            time++;
        }
        return time;
    }
}
