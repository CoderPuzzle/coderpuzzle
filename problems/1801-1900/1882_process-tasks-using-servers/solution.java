import java.util.*;

class Solution {

    // free is ordered (weight, index); busy is ordered by release time.
    // Drain finished servers, wait for the earliest if needed, then hand
    // the task to the smallest free server.
    public long[] assignTasks(int[] servers, int[] tasks) {
        int m = tasks.length;
        PriorityQueue<int[]> free = new PriorityQueue<>((a, b) -> a[0] != b[0] ? a[0] - b[0] : a[1] - b[1]);
        PriorityQueue<long[]> busy = new PriorityQueue<>((a, b) -> Long.compare(a[0], b[0]));
        for (int i = 0; i < servers.length; i++) {
            free.add(new int[] { servers[i], i });
        }
        long[] ans = new long[m];
        long cur = 0;
        for (int j = 0; j < m; j++) {
            cur = Math.max(cur, j);
            while (!busy.isEmpty() && busy.peek()[0] <= cur) {
                long[] done = busy.poll();
                free.add(new int[] { (int) done[1], (int) done[2] });
            }
            if (free.isEmpty()) {
                cur = busy.peek()[0];
                while (!busy.isEmpty() && busy.peek()[0] <= cur) {
                    long[] done = busy.poll();
                    free.add(new int[] { (int) done[1], (int) done[2] });
                }
            }
            int[] pick = free.poll();
            busy.add(new long[] { cur + tasks[j], pick[0], pick[1] });
            ans[j] = pick[1];
        }
        return ans;
    }
}
