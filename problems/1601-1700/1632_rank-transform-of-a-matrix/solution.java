import java.util.*;

class Solution {

    public int[][] matrixRankTransform(int[][] matrix) {
        int m = matrix.length;
        int n = matrix[0].length;
        // cells sorted by (value, r, c); idx = r * n + c encodes (r, c) order.
        Integer[] cells = new Integer[m * n];
        for (int i = 0; i < m * n; i++) cells[i] = i;
        Arrays.sort(cells, (a, b) -> {
            int va = matrix[a / n][a % n];
            int vb = matrix[b / n][b % n];
            if (va != vb) return Integer.compare(va, vb);
            return Integer.compare(a, b);
        });

        // Largest rank used so far in each row/column, from smaller values
        // (processing is in increasing value order, so those are final).
        int[] rowMax = new int[m];
        int[] colMax = new int[n];
        int[][] ans = new int[m][n];

        int[] parent = new int[m * n];
        // find/union below

        int i = 0;
        int count = cells.length;
        while (i < count) {
            int value = matrix[cells[i] / n][cells[i] % n];
            int j = i;
            List<Integer> group = new ArrayList<>();
            while (j < count && matrix[cells[j] / n][cells[j] % n] == value) {
                group.add(cells[j]);
                j++;
            }

            // Fresh union-find per group, so components never leak across
            // different values. Equal values sharing a row or column are
            // forced to the same rank; unions chain through shared
            // rows/columns.
            for (int idx : group) parent[idx] = idx;
            Map<Integer, Integer> byRow = new HashMap<>();
            for (int idx : group) {
                int r = idx / n;
                Integer prev = byRow.get(r);
                if (prev != null) {
                    union(parent, idx, prev);
                } else {
                    byRow.put(r, idx);
                }
            }
            Map<Integer, Integer> byCol = new HashMap<>();
            for (int idx : group) {
                int c = idx % n;
                Integer prev = byCol.get(c);
                if (prev != null) {
                    union(parent, idx, prev);
                } else {
                    byCol.put(c, idx);
                }
            }

            // Component rank = 1 + the strictest requirement over its cells;
            // that is simultaneously the smallest legal rank for all of them.
            Map<Integer, Integer> compRank = new HashMap<>();
            for (int idx : group) {
                int r = idx / n;
                int c = idx % n;
                int root = find(parent, idx);
                int candidate = Math.max(rowMax[r], colMax[c]) + 1;
                Integer cur = compRank.get(root);
                if (cur == null || candidate > cur) {
                    compRank.put(root, candidate);
                }
            }

            // Assign the shared rank and refresh the row/column maxima so
            // later, larger values see it.
            for (int idx : group) {
                int r = idx / n;
                int c = idx % n;
                int rank = compRank.get(find(parent, idx));
                ans[r][c] = rank;
                if (rank > rowMax[r]) rowMax[r] = rank;
                if (rank > colMax[c]) colMax[c] = rank;
            }

            i = j;
        }

        return ans;
    }

    private int find(int[] parent, int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }

    private void union(int[] parent, int a, int b) {
        int ra = find(parent, a);
        int rb = find(parent, b);
        if (ra != rb) parent[rb] = ra;
    }
}
