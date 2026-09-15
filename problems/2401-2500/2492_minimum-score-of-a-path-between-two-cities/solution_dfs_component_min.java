import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    public int minScore(int n, int[][] roads) {
        // A path may reuse roads, so every road whose two endpoints are
        // reachable from city 1 belongs to some valid path. Discover the
        // component by walking it: build the adjacency list, flood
        // outward from city 1 with an explicit stack, then take the
        // smallest distance among the roads the flood reached.
        List<List<Integer>> adjacency = new ArrayList<>();
        for (int i = 0; i <= n; i++) adjacency.add(new ArrayList<>());
        for (int[] r : roads) {
            adjacency.get(r[0]).add(r[1]);
            adjacency.get(r[1]).add(r[0]);
        }
        boolean[] reached = new boolean[n + 1];
        reached[1] = true;
        Deque<Integer> stack = new ArrayDeque<>();
        stack.push(1);
        while (!stack.isEmpty()) {
            int city = stack.pop();
            for (int other : adjacency.get(city)) {
                if (!reached[other]) {
                    reached[other] = true;
                    stack.push(other);
                }
            }
        }
        int best = 1000000000;
        for (int[] r : roads) {
            if (reached[r[0]] && r[2] < best) {
                best = r[2];
            }
        }
        return best;
    }
}
