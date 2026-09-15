import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;

class Solution {

    public int minimumOperationsToMakeEqual(int x, int y) {
        // Values are states and every operation is a unit-cost edge, so BFS
        // layers count operations. Only +1 ever raises the value, so a
        // target at or above x costs exactly y - x steps; below x, an
        // optimal path never climbs past x + (x - y), which the
        // 1 <= x, y <= 10^4 box keeps under 2 * 10^4.
        final int limit = 20010;
        int[] dist = new int[limit + 1];
        Arrays.fill(dist, -1);
        dist[x] = 0;
        Deque<Integer> queue = new ArrayDeque<>();
        queue.add(x);
        while (!queue.isEmpty()) {
            int v = queue.poll();
            if (v == y) {
                return dist[v];
            }
            int[] steps = { v - 1, v + 1, v % 11 == 0 ? v / 11 : -1, v % 5 == 0 ? v / 5 : -1 };
            for (int nxt : steps) {
                if (nxt >= 1 && nxt <= limit && dist[nxt] < 0) {
                    dist[nxt] = dist[v] + 1;
                    queue.add(nxt);
                }
            }
        }
        return dist[y];
    }
}
