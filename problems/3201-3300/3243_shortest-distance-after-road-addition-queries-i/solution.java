import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    public int[] shortestDistanceAfterQueries(int n, int[][] queries) {
        // Every added road can only shorten paths, so nothing computed for
        // an earlier query stays reusable except the road set itself. Keep
        // an adjacency list, append each new road, then run one unweighted
        // BFS from city 0 that stops as soon as city n - 1 is settled.
        // With n, q <= 500 this recomputation per query is cheap and exact.
        List<List<Integer>> roads = new ArrayList<>();
        for (int i = 0; i < n; i++) roads.add(new ArrayList<>());
        for (int i = 0; i + 1 < n; i++) roads.get(i).add(i + 1);
        int[] answer = new int[queries.length];
        for (int qi = 0; qi < queries.length; qi++) {
            roads.get(queries[qi][0]).add(queries[qi][1]);
            int[] dist = new int[n];
            Arrays.fill(dist, -1);
            int[] queue = new int[n];
            int head = 0;
            int tail = 0;
            dist[0] = 0;
            queue[tail++] = 0;
            while (head < tail) {
                int node = queue[head++];
                if (node == n - 1) break;
                for (int nxt : roads.get(node)) {
                    if (dist[nxt] == -1) {
                        dist[nxt] = dist[node] + 1;
                        queue[tail++] = nxt;
                    }
                }
            }
            answer[qi] = dist[n - 1];
        }
        return answer;
    }
}
