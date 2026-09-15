import java.util.HashMap;
import java.util.Map;

class Solution {

    private double wOut; // weight result of the last find() call

    public boolean checkContradictions(String[][] equations, double[] values) {
        final double EPS = 1e-5;
        Map<String, Integer> id = new HashMap<>();
        int[] parent = new int[equations.length * 2];
        double[] weight = new double[equations.length * 2];
        for (int i = 0; i < parent.length; i++) {
            parent[i] = i;
            weight[i] = 1.0;
        }

        for (int i = 0; i < equations.length; i++) {
            int a = getId(id, equations[i][0], parent, weight);
            int b = getId(id, equations[i][1], parent, weight);
            double w = values[i];
            int rootA = find(a, parent, weight);
            double wa = wOut;
            int rootB = find(b, parent, weight);
            double wb = wOut;
            if (rootA == rootB) {
                if (Math.abs(wa / wb - w) > EPS) return true;
            } else {
                parent[rootA] = rootB;
                weight[rootA] = (wb * w) / wa;
            }
        }
        return false;
    }

    private int getId(Map<String, Integer> id, String s, int[] parent, double[] weight) {
        Integer existing = id.get(s);
        if (existing != null) return existing;
        int fresh = id.size();
        id.put(s, fresh);
        parent[fresh] = fresh;
        weight[fresh] = 1.0;
        return fresh;
    }

    // Returns the root of x; leaves x / root in wOut.
    private int find(int x, int[] parent, double[] weight) {
        if (parent[x] == x) {
            wOut = 1.0;
            return x;
        }
        int root = find(parent[x], parent, weight);
        double w = wOut;
        parent[x] = root;
        weight[x] *= w;
        wOut = weight[x];
        return root;
    }
}
