import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public boolean checkContradictions(String[][] equations, double[] values) {
        final double EPS = 1e-5;
        Map<String, Integer> id = new HashMap<>();
        int cap = equations.length * 2;
        List<List<Edge>> adj = new ArrayList<>(cap);
        for (int i = 0; i < cap; i++) {
            adj.add(new ArrayList<>());
        }

        for (int i = 0; i < equations.length; i++) {
            int a = getId(id, equations[i][0]);
            int b = getId(id, equations[i][1]);
            double w = values[i];
            adj.get(b).add(new Edge(a, w));
            adj.get(a).add(new Edge(b, 1 / w));
        }

        double[] ratio = new double[cap]; // 0 marks unvisited; labels are positive
        Deque<Integer> queue = new ArrayDeque<>();
        for (int root = 0; root < cap; root++) {
            if (ratio[root] != 0.0) continue;
            ratio[root] = 1.0;
            queue.add(root);
            while (!queue.isEmpty()) {
                int x = queue.poll();
                for (Edge e : adj.get(x)) {
                    if (ratio[e.to] == 0.0) {
                        ratio[e.to] = ratio[x] * e.factor;
                        queue.add(e.to);
                    }
                }
            }
        }

        for (int i = 0; i < equations.length; i++) {
            int a = getId(id, equations[i][0]);
            int b = getId(id, equations[i][1]);
            double w = values[i];
            if (Math.abs(ratio[a] / ratio[b] - w) > EPS) return true;
        }
        return false;
    }

    private int getId(Map<String, Integer> id, String s) {
        Integer existing = id.get(s);
        if (existing != null) return existing;
        int fresh = id.size();
        id.put(s, fresh);
        return fresh;
    }

    private static class Edge {

        private final int to;
        private final double factor; // to / from

        Edge(int to, double factor) {
            this.to = to;
            this.factor = factor;
        }
    }
}
