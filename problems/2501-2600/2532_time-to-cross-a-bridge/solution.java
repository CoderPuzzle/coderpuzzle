import java.util.PriorityQueue;

class Solution {

    public int findCrossingTime(int n, int k, int[][] time) {
        // Priority is static per worker: least efficient = larger left+right,
        // ties to the larger index. Encoded as min-key (-eff, -i).
        PriorityQueue<int[]> left = new PriorityQueue<>((a, b) ->
            a[0] != b[0] ? Integer.compare(a[0], b[0]) : Integer.compare(a[1], b[1])
        );
        PriorityQueue<int[]> right = new PriorityQueue<>(left.comparator());
        // Pending completions keyed by ready time: {readyTime, side, i}.
        PriorityQueue<int[]> pending = new PriorityQueue<>((a, b) -> a[0] != b[0] ? Integer.compare(a[0], b[0]) : 0);
        for (int i = 0; i < k; i++) {
            left.add(new int[] { -(time[i][0] + time[i][2]), -i });
        }
        int cur = 0; // instant the bridge becomes free again
        int sent = 0;
        int delivered = 0;
        int ans = 0;
        while (delivered < n) {
            while (!pending.isEmpty() && pending.peek()[0] <= cur) {
                int[] done = pending.poll();
                int effI = -(time[done[2]][0] + time[done[2]][2]);
                (done[1] == 1 ? right : left).add(new int[] { effI, -done[2] });
            }
            if (!right.isEmpty()) {
                // A boxed worker on the right bank always has priority.
                int i = -right.poll()[1];
                cur += time[i][2];
                delivered++;
                ans = Math.max(ans, cur); // box reaches the left bank here
                if (delivered == n) {
                    break; // the final put never delays anything
                }
                pending.add(new int[] { cur + time[i][3], 0, i });
            } else if (!left.isEmpty() && sent < n) {
                int i = -left.poll()[1];
                cur += time[i][0];
                sent++;
                pending.add(new int[] { cur + time[i][1], 1, i });
            } else {
                // Nobody can cross yet: jump to the next readiness instant.
                cur = pending.peek()[0];
            }
        }
        return ans;
    }
}
