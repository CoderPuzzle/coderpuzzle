class Solution {

    private int[] parent;
    private int[] size;

    private int find(int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }

    private void union(int a, int b) {
        int ra = find(a),
            rb = find(b);
        if (ra == rb) return;
        if (size[ra] < size[rb]) {
            int t = ra;
            ra = rb;
            rb = t;
        }
        parent[rb] = ra;
        size[ra] += size[rb];
    }

    public int removeStones(int[][] stones) {
        // Stones joined by shared rows and columns split the plane into
        // connected components. Inside a component of k stones any k - 1 can
        // go: peel the component down to one survivor, every removal still
        // sharing a row or column with a stone that remains. Stones of
        // different components never share a line, so the answer is n minus
        // the number of components — union-find merges each stone with the
        // first stone registered in its row and in its column, and the roots
        // count the components.
        int n = stones.length;
        parent = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
        size = new int[n];
        java.util.Arrays.fill(size, 1);

        java.util.HashMap<Integer, Integer> firstInRow = new java.util.HashMap<>();
        java.util.HashMap<Integer, Integer> firstInCol = new java.util.HashMap<>();
        for (int i = 0; i < n; i++) {
            int x = stones[i][0],
                y = stones[i][1];
            Integer r = firstInRow.get(x);
            if (r == null) firstInRow.put(x, i);
            else union(i, r);
            Integer c = firstInCol.get(y);
            if (c == null) firstInCol.put(y, i);
            else union(i, c);
        }

        int components = 0;
        for (int i = 0; i < n; i++) {
            if (find(i) == i) components++;
        }
        return n - components;
    }
}
