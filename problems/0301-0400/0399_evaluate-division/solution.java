import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public double[] calcEquation(String[][] equations, double[] values, String[][] queries) {
        // node -> LinkedHashMap(neighbor -> weight): preserves insertion order and
        // updating an existing key keeps its original position (like Python dict).
        Map<String, Map<String, Double>> graph = new HashMap<>();
        // Each equation a/b = v becomes a directed edge a -> b of weight v
        // plus the reverse edge of weight 1/v (division inverts with direction).
        for (int i = 0; i < equations.length; i++) {
            String a = equations[i][0],
                b = equations[i][1];
            graph.computeIfAbsent(a, x -> new LinkedHashMap<>()).put(b, values[i]);
            graph.computeIfAbsent(b, x -> new LinkedHashMap<>()).put(a, 1.0 / values[i]);
        }

        double[] result = new double[queries.length];
        for (int q = 0; q < queries.length; q++) {
            result[q] = query(graph, queries[q][0], queries[q][1]);
        }
        return result;
    }

    private double query(Map<String, Map<String, Double>> graph, String start, String end) {
        // An unknown variable is unanswerable (this also covers x / x for
        // an undefined x); a known variable over itself is 1.0.
        if (!graph.containsKey(start) || !graph.containsKey(end)) return -1.0;
        if (start.equals(end)) return 1.0;
        // BFS carrying the running product: weights along the path telescope
        // to start / end because intermediate variables cancel.
        Map<String, Boolean> seen = new HashMap<>();
        seen.put(start, true);
        Deque<String> nodeQueue = new ArrayDeque<>();
        Deque<Double> prodQueue = new ArrayDeque<>();
        nodeQueue.add(start);
        prodQueue.add(1.0);
        while (!nodeQueue.isEmpty()) {
            String node = nodeQueue.poll();
            double product = prodQueue.poll();
            for (Map.Entry<String, Double> edge : graph.get(node).entrySet()) {
                String neighbor = edge.getKey();
                double weight = edge.getValue();
                if (neighbor.equals(end)) {
                    // Equations are consistent, so the first path found
                    // already yields the correct quotient.
                    return product * weight;
                }
                if (!seen.containsKey(neighbor)) {
                    seen.put(neighbor, true);
                    nodeQueue.add(neighbor);
                    prodQueue.add(product * weight);
                }
            }
        }
        return -1.0;
    }
}
