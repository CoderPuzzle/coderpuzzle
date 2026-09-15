import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public int findCircleNum(int[][] isConnected) {
        int n = isConnected.length;
        boolean[] visited = new boolean[n];
        int provinces = 0;
        for (int start = 0; start < n; start++) {
            if (visited[start]) {
                continue;
            }
            // An unvisited city during the sweep starts a new component;
            // this one traversal absorbs exactly one province.
            provinces++;
            visited[start] = true;
            Deque<Integer> queue = new ArrayDeque<>();
            queue.offer(start);
            // The FIFO queue spreads through the province in waves, expanding
            // every city at hop distance d before any at d + 1, yet only
            // visitation, not the order, decides the count.
            while (!queue.isEmpty()) {
                int city = queue.poll();
                for (int other = 0; other < n; other++) {
                    if (isConnected[city][other] == 1 && !visited[other]) {
                        // Mark at enqueue time so no city enters the queue twice;
                        // each city is dequeued once and its adjacency row scanned
                        // once.
                        visited[other] = true;
                        queue.offer(other);
                    }
                }
            }
        }
        return provinces;
    }
}
