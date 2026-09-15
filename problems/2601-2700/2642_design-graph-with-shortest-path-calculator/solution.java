import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.PriorityQueue;

class Graph {

    private final List<int[]>[] adjacency;

    @SuppressWarnings("unchecked")
    public Graph(int n, int[][] edges) {
        // Edges are only appended, never removed or reweighted, so a
        // plain adjacency list never needs invalidating or rebuilding.
        this.adjacency = new List[n];
        for (int node = 0; node < n; node++) {
            adjacency[node] = new ArrayList<>();
        }
        for (int[] edge : edges) {
            adjacency[edge[0]].add(new int[] { edge[1], edge[2] });
        }
    }

    public void addEdge(int[] edge) {
        adjacency[edge[0]].add(new int[] { edge[1], edge[2] });
    }

    public int shortestPath(int node1, int node2) {
        if (node1 == node2) {
            return 0;
        }
        // Every cost is positive, so Dijkstra applies: the min-heap
        // hands out nodes in settle order by tentative distance. Longs
        // keep the Long.MAX_VALUE sentinel arithmetic clean.
        int n = adjacency.length;
        long[] distance = new long[n];
        Arrays.fill(distance, Long.MAX_VALUE);
        distance[node1] = 0;
        PriorityQueue<long[]> heap = new PriorityQueue<>((a, b) -> Long.compare(a[0], b[0]));
        heap.offer(new long[] { 0, node1 });
        while (!heap.isEmpty()) {
            long[] top = heap.poll();
            long soFar = top[0];
            int node = (int) top[1];
            // Stale entry: the node was already settled through a
            // cheaper route, so skip it.
            if (soFar > distance[node]) {
                continue;
            }
            // Popping node2 settles it, so its distance is final here.
            if (node == node2) {
                return (int) soFar;
            }
            for (int[] edge : adjacency[node]) {
                long candidate = soFar + edge[1];
                // Only improving relaxations push a fresh entry, so any
                // entry goes stale at most once.
                if (candidate < distance[edge[0]]) {
                    distance[edge[0]] = candidate;
                    heap.offer(new long[] { candidate, edge[0] });
                }
            }
        }
        return -1;
    }
}
