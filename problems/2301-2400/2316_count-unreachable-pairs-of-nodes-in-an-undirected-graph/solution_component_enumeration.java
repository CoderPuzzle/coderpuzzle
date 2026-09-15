import java.util.ArrayList;
import java.util.List;

class Solution {

    public long countPairs(int n, int[][] edges) {
        // components answer the question: all C(n, 2) pairs minus the pairs
        // inside one component, so enumerate each component exactly once
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }
        for (int[] e : edges) {
            // an undirected edge is walkable both ways, so each endpoint
            // records the other as a neighbour
            adj.get(e[0]).add(e[1]);
            adj.get(e[1]).add(e[0]);
        }

        boolean[] visited = new boolean[n];
        // a flat array with a read cursor serves as the queue: writing at
        // tail is the push, the advancing head the pop. The walk is
        // iterative end to end -- recursive DFS would throw a
        // StackOverflowError on one long component
        int[] queue = new int[n];
        // the count can approach 5*10^9 for n = 10^5, hence the long arithmetic
        long reachable = 0;
        for (int seed = 0; seed < n; seed++) {
            if (visited[seed]) {
                continue;
            }
            visited[seed] = true;
            int tail = 0;
            queue[tail++] = seed;
            // marking a node when it is enqueued, not when it is dequeued,
            // keeps every node in the queue exactly once
            for (int head = 0; head < tail; head++) {
                for (int v : adj.get(queue[head])) {
                    if (!visited[v]) {
                        visited[v] = true;
                        queue[tail++] = v;
                    }
                }
            }
            // the queue prefix [0, tail) now holds precisely this component:
            // its size*(size-1)/2 internal pairs are exactly the reachable
            // pairs it contributes
            long size = tail;
            reachable += (size * (size - 1)) / 2;
        }
        // whatever remains of C(n, 2) counts each unreachable pair once
        return ((long) n * (n - 1)) / 2 - reachable;
    }
}
