import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public int coinChange(int[] coins, int amount) {
        // BFS over amounts: level k holds every amount reachable with
        // exactly k coins, so the first time `amount` is dequeued its level
        // is the minimum coin count.
        boolean[] visited = new boolean[amount + 1];
        visited[0] = true;
        Deque<Integer> queue = new ArrayDeque<>();
        queue.offer(0);
        int level = 0;
        while (!queue.isEmpty()) {
            int size = queue.size();
            for (int k = 0; k < size; k++) {
                int a = queue.poll();
                if (a == amount) {
                    // Level order guarantees no cheaper level exists.
                    return level;
                }
                for (int c : coins) {
                    // Coins may be near INT_MAX, so test c <= amount - a
                    // before adding; visited keeps each amount enqueued once.
                    if (c <= amount - a && !visited[a + c]) {
                        visited[a + c] = true;
                        queue.offer(a + c);
                    }
                }
            }
            level++;
        }
        // The queue drained without ever reaching amount: unmakeable.
        return -1;
    }
}
