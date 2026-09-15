import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    public int specialNodes(int n, int[][] edges, int x, int y, int z) {
        List<List<Integer>> adjacency = new ArrayList<>();
        for (int node = 0; node < n; node++) {
            adjacency.add(new ArrayList<>());
        }
        for (int[] edge : edges) {
            adjacency.get(edge[0]).add(edge[1]);
            adjacency.get(edge[1]).add(edge[0]);
        }

        int[] dx = distances(adjacency, x, n);
        int[] dy = distances(adjacency, y, n);
        int[] dz = distances(adjacency, z, n);

        int answer = 0;
        for (int node = 0; node < n; node++) {
            int a = dx[node];
            int b = dy[node];
            int c = dz[node];
            int swap;
            if (a > b) {
                swap = a;
                a = b;
                b = swap;
            }
            if (b > c) {
                swap = b;
                b = c;
                c = swap;
            }
            if (a > b) {
                swap = a;
                a = b;
                b = swap;
            }
            // Distances reach 10^5, so squares reach 10^10: compare in long.
            if ((long) a * a + (long) b * b == (long) c * c) {
                answer++;
            }
        }
        return answer;
    }

    // Every tree edge has unit weight, so a breadth-first search from a
    // target reaches nodes in increasing distance order. The explicit
    // frontier array keeps a 10^5-node path off the call stack.
    private int[] distances(List<List<Integer>> adjacency, int source, int n) {
        int[] dist = new int[n];
        Arrays.fill(dist, -1);
        dist[source] = 0;
        int[] frontier = new int[n];
        frontier[0] = source;
        int found = 1;
        for (int index = 0; index < found; index++) {
            int node = frontier[index];
            for (int neighbor : adjacency.get(node)) {
                if (dist[neighbor] < 0) {
                    dist[neighbor] = dist[node] + 1;
                    frontier[found++] = neighbor;
                }
            }
        }
        return dist;
    }
}
