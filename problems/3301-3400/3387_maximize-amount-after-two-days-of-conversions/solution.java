import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Deque;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    private static class Edge {

        final int target;
        final double rate;
        final boolean forward;

        Edge(int target, double rate, boolean forward) {
            this.target = target;
            this.rate = rate;
            this.forward = forward;
        }
    }

    // Day 1 ends holding some intermediate currency c, and day 2
    // converts c back to initialCurrency. Rates are consistent (no
    // contradictions), so the first BFS visit to a currency already
    // carries its maximum amount: day 1 is one BFS from initialCurrency
    // (forward edges multiply by the rate, reverse edges divide by it),
    // and day 2 reruns the same BFS from every currency reached on
    // day 1, carrying that currency's amount. The answer is the largest
    // amount of initialCurrency any of those searches ends with.
    public double maxAmount(
        String initialCurrency,
        String[][] pairs1,
        double[] rates1,
        String[][] pairs2,
        double[] rates2
    ) {
        Map<String, Integer> ids = new HashMap<>();
        // Register initialCurrency first: it may appear in no pair at all.
        int source = ids.computeIfAbsent(initialCurrency, key -> ids.size());
        List<List<Edge>> day1 = build(pairs1, rates1, ids);
        List<List<Edge>> day2 = build(pairs2, rates2, ids);
        int n = ids.size();
        // Amounts are always positive, so -1.0 marks "not visited yet".
        double[] day1Amount = new double[n];
        Arrays.fill(day1Amount, -1.0);
        int[] order = new int[n];
        int count = 0;
        Deque<Integer> queue = new ArrayDeque<>();
        day1Amount[source] = 1.0;
        order[count++] = source;
        queue.add(source);
        while (!queue.isEmpty()) {
            int currency = queue.poll();
            for (Edge edge : day1.get(currency)) {
                if (day1Amount[edge.target] >= 0.0) continue;
                day1Amount[edge.target] = edge.forward
                    ? day1Amount[currency] * edge.rate
                    : day1Amount[currency] / edge.rate;
                order[count++] = edge.target;
                queue.add(edge.target);
            }
        }
        double best = 0.0;
        double[] amount = new double[n];
        for (int i = 0; i < count; ++i) {
            Arrays.fill(amount, -1.0);
            int start = order[i];
            amount[start] = day1Amount[start];
            queue.add(start);
            while (!queue.isEmpty()) {
                int currency = queue.poll();
                for (Edge edge : day2.get(currency)) {
                    if (amount[edge.target] >= 0.0) continue;
                    amount[edge.target] = edge.forward ? amount[currency] * edge.rate : amount[currency] / edge.rate;
                    queue.add(edge.target);
                }
            }
            best = Math.max(best, amount[source]);
        }
        return best;
    }

    private static List<List<Edge>> build(String[][] pairs, double[] rates, Map<String, Integer> ids) {
        List<List<Edge>> graph = new ArrayList<>();
        for (int i = 0; i < pairs.length; ++i) {
            int start = ids.computeIfAbsent(pairs[i][0], key -> ids.size());
            int target = ids.computeIfAbsent(pairs[i][1], key -> ids.size());
            while (graph.size() < ids.size()) graph.add(new ArrayList<>());
            graph.get(start).add(new Edge(target, rates[i], true));
            graph.get(target).add(new Edge(start, rates[i], false));
        }
        while (graph.size() < ids.size()) graph.add(new ArrayList<>());
        return graph;
    }
}
