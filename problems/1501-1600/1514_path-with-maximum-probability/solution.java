import java.util.ArrayList;
import java.util.List;
import java.util.PriorityQueue;

class Solution {

    public double maxProbability(int n, int[][] edges, double[] succProb, int start_node, int end_node) {
        List<List<double[]>> adjacency = new ArrayList<>();
        for (int i = 0; i < n; ++i) adjacency.add(new ArrayList<>());
        for (int i = 0; i < edges.length; ++i) {
            int a = edges[i][0];
            int b = edges[i][1];
            double probability = succProb[i];
            adjacency.get(a).add(new double[] { b, probability });
            adjacency.get(b).add(new double[] { a, probability });
        }

        double[] best = new double[n];
        best[start_node] = 1.0;
        boolean[] visited = new boolean[n];
        // Max-heap ordered by probability, highest first.
        PriorityQueue<double[]> heap = new PriorityQueue<>((x, y) -> Double.compare(y[0], x[0]));
        heap.offer(new double[] { 1.0, start_node });
        while (!heap.isEmpty()) {
            double[] top = heap.poll();
            double probability = top[0];
            int node = (int) top[1];
            if (visited[node]) continue;
            visited[node] = true;
            if (node == end_node) return probability;
            for (double[] edge : adjacency.get(node)) {
                int neighbor = (int) edge[0];
                double candidate = probability * edge[1];
                if (candidate > best[neighbor]) {
                    best[neighbor] = candidate;
                    heap.offer(new double[] { candidate, neighbor });
                }
            }
        }
        return best[end_node];
    }
}
