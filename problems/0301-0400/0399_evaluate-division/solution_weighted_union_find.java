import java.util.HashMap;
import java.util.Map;

class Solution {

    public double[] calcEquation(String[][] equations, double[] values, String[][] queries) {
        // Weighted union-find over the variable names: parent maps each node
        // to its current parent and weight holds node / parent, so the
        // product along a parent chain is the member's ratio to its root.
        Map<String, String> parent = new HashMap<>();
        Map<String, Double> weight = new HashMap<>();
        Map<String, Integer> size = new HashMap<>();
        // Each stated ratio a / b = v becomes one merge of the two variables.
        for (int i = 0; i < equations.length; i++) {
            add(parent, weight, size, equations[i][0]);
            add(parent, weight, size, equations[i][1]);
            unite(parent, weight, size, equations[i][0], equations[i][1], values[i]);
        }

        double[] result = new double[queries.length];
        for (int q = 0; q < queries.length; q++) {
            result[q] = query(parent, weight, queries[q][0], queries[q][1]);
        }
        return result;
    }

    private void add(Map<String, String> parent, Map<String, Double> weight, Map<String, Integer> size, String node) {
        if (!parent.containsKey(node)) {
            parent.put(node, node);
            weight.put(node, 1.0);
            size.put(node, 1);
        }
    }

    private String find(Map<String, String> parent, Map<String, Double> weight, String x) {
        // Walk up to the root, then re-hang every visited node directly on it
        // (path compression), each stored weight becoming the node / root
        // quotient that ratioToRoot folds on the way.
        String root = x;
        while (!parent.get(root).equals(root)) {
            root = parent.get(root);
        }
        double quotient = ratioToRoot(parent, weight, x);
        while (!parent.get(x).equals(root)) {
            String next = parent.get(x);
            double step = weight.get(x);
            parent.put(x, root);
            weight.put(x, quotient);
            x = next;
            quotient /= step;
        }
        return root;
    }

    private double ratioToRoot(Map<String, String> parent, Map<String, Double> weight, String x) {
        // Multiply node / parent along the chain: intermediate variables
        // cancel in equations, leaving exactly x / root.
        double ratio = 1.0;
        while (!parent.get(x).equals(x)) {
            ratio *= weight.get(x);
            x = parent.get(x);
        }
        return ratio;
    }

    private void unite(
        Map<String, String> parent,
        Map<String, Double> weight,
        Map<String, Integer> size,
        String a,
        String b,
        double value
    ) {
        // Fold one stated ratio a / b = value into the forest.
        String rootA = find(parent, weight, a);
        String rootB = find(parent, weight, b);
        if (rootA.equals(rootB)) {
            // The batch never contradicts itself, so a ratio restating an
            // existing link agrees with the folded product.
            return;
        }
        double ratioA = ratioToRoot(parent, weight, a);
        double ratioB = ratioToRoot(parent, weight, b);
        if (size.get(rootA) < size.get(rootB)) {
            // Union by size: hang the smaller tree under the larger.
            String swapRoot = rootA;
            rootA = rootB;
            rootB = swapRoot;
            double swapRatio = ratioA;
            ratioA = ratioB;
            ratioB = swapRatio;
            value = 1.0 / value;
        }
        // a = value * b written in root terms, ratioA * rootA =
        // value * ratioB * rootB, solves the new weight rootB / rootA.
        parent.put(rootB, rootA);
        weight.put(rootB, ratioA / (value * ratioB));
        size.put(rootA, size.get(rootA) + size.get(rootB));
    }

    private double query(Map<String, String> parent, Map<String, Double> weight, String start, String end) {
        // An unknown variable is unanswerable (this also covers x / x for
        // an undefined x); a known variable over itself is 1.0.
        if (!parent.containsKey(start) || !parent.containsKey(end)) return -1.0;
        String rootStart = find(parent, weight, start);
        String rootEnd = find(parent, weight, end);
        if (!rootStart.equals(rootEnd)) {
            // Different roots mean no stated ratio links the two groups.
            return -1.0;
        }
        return ratioToRoot(parent, weight, start) / ratioToRoot(parent, weight, end);
    }
}
