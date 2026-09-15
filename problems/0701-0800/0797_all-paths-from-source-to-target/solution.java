class Solution {

    private int[][] graph;
    private int target;
    private java.util.List<java.util.List<Integer>> paths;
    private java.util.List<Integer> path;

    public int[][] allPathsSourceTarget(int[][] graph) {
        this.graph = graph;
        this.target = graph.length - 1;
        this.paths = new java.util.ArrayList<>();
        this.path = new java.util.ArrayList<>();
        path.add(0);
        dfs(0);
        int[][] res = new int[paths.size()][];
        for (int i = 0; i < paths.size(); i++) {
            java.util.List<Integer> p = paths.get(i);
            int[] row = new int[p.size()];
            for (int j = 0; j < p.size(); j++) {
                row[j] = p.get(j);
            }
            res[i] = row;
        }
        return res;
    }

    private void dfs(int node) {
        // The graph is acyclic, so every walk from 0 is a simple
        // path and DFS can never loop; at the target, snapshot a
        // copy and stop.
        if (node == target) {
            paths.add(new java.util.ArrayList<>(path));
            return;
        }
        for (int nxt : graph[node]) {
            // Backtrack: remove after returning so sibling branches
            // each see a clean path. No visited set is needed —
            // paths legitimately share prefixes.
            path.add(nxt);
            dfs(nxt);
            path.remove(path.size() - 1);
        }
    }
}
