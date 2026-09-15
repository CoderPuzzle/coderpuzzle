class Solution {

    public int[] numIslands2(int m, int n, int[][] positions) {
        // Union-find over flattened cell ids r * n + c keeps the island count
        // incremental; no full grid rescan after each add-land.
        int[] parent = new int[m * n];
        int[] size = new int[m * n];
        boolean[] land = new boolean[m * n];
        for (int i = 0; i < m * n; i++) {
            parent[i] = i;
            size[i] = 1;
        }
        int[] answer = new int[positions.length];
        int count = 0;
        for (int i = 0; i < positions.length; i++) {
            int r = positions[i][0],
                c = positions[i][1];
            int cell = r * n + c;
            // A repeated position changes nothing; re-emit the current count.
            if (land[cell]) {
                answer[i] = count;
                continue;
            }
            // The new land starts as its own island before any merges.
            land[cell] = true;
            count++;
            int[] dr = { 1, -1, 0, 0 };
            int[] dc = { 0, 0, 1, -1 };
            for (int k = 0; k < 4; k++) {
                int nr = r + dr[k],
                    nc = c + dc[k];
                if (nr < 0 || nr >= m || nc < 0 || nc >= n || !land[nr * n + nc]) {
                    continue;
                }
                // Distinct roots mean two islands merge, losing one count; a
                // later neighbor of the same island re-finds the merged root,
                // so no extra decrement sneaks in.
                int ra = find(parent, cell);
                int rb = find(parent, nr * n + nc);
                if (ra != rb) {
                    // Union by size: attach the smaller tree underneath.
                    if (size[ra] < size[rb]) {
                        int t = ra;
                        ra = rb;
                        rb = t;
                    }
                    parent[rb] = ra;
                    size[ra] += size[rb];
                    count--;
                }
            }
            answer[i] = count;
        }
        return answer;
    }

    private int find(int[] parent, int x) {
        // Path halving: splice x onto its grandparent, flattening chains.
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }
}
