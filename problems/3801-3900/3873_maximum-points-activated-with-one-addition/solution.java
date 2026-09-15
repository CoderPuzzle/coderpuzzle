import java.util.HashMap;
import java.util.Map;

class Solution {

    public int maxActivated(int[][] points) {
        // Union every pair of points sharing an x or a y coordinate; the
        // activation closure of any point is its component, and a new point
        // touches at most two components, so join the two largest (or all,
        // when there is a single component).
        int n = points.length;
        int[] parent = new int[n];
        int[] size = new int[n];
        for (int i = 0; i < n; i++) {
            parent[i] = i;
            size[i] = 1;
        }
        Map<Integer, Integer> xmap = new HashMap<>();
        Map<Integer, Integer> ymap = new HashMap<>();
        for (int i = 0; i < n; i++) {
            int x = points[i][0];
            int y = points[i][1];
            if (xmap.containsKey(x)) {
                union(parent, size, i, xmap.get(x));
            } else {
                xmap.put(x, i);
            }
            if (ymap.containsKey(y)) {
                union(parent, size, i, ymap.get(y));
            } else {
                ymap.put(y, i);
            }
        }
        Map<Integer, Integer> comp = new HashMap<>();
        for (int i = 0; i < n; i++) {
            int r = find(parent, i);
            comp.put(r, comp.getOrDefault(r, 0) + 1);
        }
        int first = 0;
        int second = 0;
        for (int value : comp.values()) {
            if (value > first) {
                second = first;
                first = value;
            } else if (value > second) {
                second = value;
            }
        }
        if (comp.size() == 1) {
            return n + 1;
        }
        return first + second + 1;
    }

    private int find(int[] parent, int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }

    private void union(int[] parent, int[] size, int a, int b) {
        int ra = find(parent, a);
        int rb = find(parent, b);
        if (ra == rb) {
            return;
        }
        if (size[ra] < size[rb]) {
            int swap = ra;
            ra = rb;
            rb = swap;
        }
        parent[rb] = ra;
        size[ra] += size[rb];
    }
}
