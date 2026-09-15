import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    public int magnificentSets(int n, int[][] edges) {
        List<List<Integer>> graph = new ArrayList<>();
        for (int i = 0; i <= n; i++) {
            graph.add(new ArrayList<>());
        }
        for (int[] e : edges) {
            graph.get(e[0]).add(e[1]);
            graph.get(e[1]).add(e[0]);
        }

        boolean[] visited = new boolean[n + 1];
        int total = 0;

        for (int start = 1; start <= n; start++) {
            if (visited[start]) {
                continue;
            }
            // collect the connected component
            List<Integer> component = new ArrayList<>();
            Deque<Integer> stack = new ArrayDeque<>();
            visited[start] = true;
            stack.push(start);
            while (!stack.isEmpty()) {
                int u = stack.pop();
                component.add(u);
                for (int v : graph.get(u)) {
                    if (!visited[v]) {
                        visited[v] = true;
                        stack.push(v);
                    }
                }
            }

            int best = 0;
            int[] dist = new int[n + 1];
            for (int source : component) {
                java.util.Arrays.fill(dist, -1);
                dist[source] = 0;
                Deque<Integer> queue = new ArrayDeque<>();
                queue.add(source);
                int maxDepth = 0;
                boolean bipartite = true;
                while (!queue.isEmpty()) {
                    int u = queue.poll();
                    for (int v : graph.get(u)) {
                        if (dist[v] != -1) {
                            if (dist[v] == dist[u]) {
                                bipartite = false;
                            }
                        } else {
                            dist[v] = dist[u] + 1;
                            if (dist[v] > maxDepth) {
                                maxDepth = dist[v];
                            }
                            queue.add(v);
                        }
                    }
                }
                if (!bipartite) {
                    return -1;
                }
                if (maxDepth > best) {
                    best = maxDepth;
                }
            }
            total += best + 1;
        }

        return total;
    }
}
