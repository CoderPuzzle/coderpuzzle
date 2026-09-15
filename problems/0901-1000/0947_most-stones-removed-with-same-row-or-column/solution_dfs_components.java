class Solution {

    public int removeStones(int[][] stones) {
        // Row-or-column adjacency splits the stones into connected
        // components, and a component of k stones gives up k - 1 of them, so
        // the answer is n minus the number of components. Rather than encode
        // the merging, walk it: bucket the stone indices by row and by
        // column, then depth-first search from every stone not yet reached,
        // expanding through both of its buckets. Each bucket is removed the
        // first time it is expanded, so the whole shared line is absorbed at
        // once and no bucket is ever scanned twice.
        int n = stones.length;
        java.util.HashMap<Integer, java.util.List<Integer>> rows = new java.util.HashMap<>();
        java.util.HashMap<Integer, java.util.List<Integer>> cols = new java.util.HashMap<>();
        for (int i = 0; i < n; i++) {
            rows.computeIfAbsent(stones[i][0], k -> new java.util.ArrayList<>()).add(i);
            cols.computeIfAbsent(stones[i][1], k -> new java.util.ArrayList<>()).add(i);
        }

        boolean[] visited = new boolean[n];
        java.util.ArrayDeque<Integer> stack = new java.util.ArrayDeque<>();
        int components = 0;
        for (int start = 0; start < n; start++) {
            if (visited[start]) continue;
            components++;
            visited[start] = true;
            stack.push(start);
            while (!stack.isEmpty()) {
                int u = stack.pop();
                java.util.List<Integer> row = rows.remove(stones[u][0]);
                if (row != null) {
                    for (int v : row) {
                        if (!visited[v]) {
                            visited[v] = true;
                            stack.push(v);
                        }
                    }
                }
                java.util.List<Integer> col = cols.remove(stones[u][1]);
                if (col != null) {
                    for (int v : col) {
                        if (!visited[v]) {
                            visited[v] = true;
                            stack.push(v);
                        }
                    }
                }
            }
        }

        return n - components;
    }
}
