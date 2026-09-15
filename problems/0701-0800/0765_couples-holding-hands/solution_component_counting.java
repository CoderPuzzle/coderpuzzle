class Solution {

    public int minSwapsCouples(int[] row) {
        int n = row.length;
        int[] pos = new int[n];
        for (int i = 0; i < n; i++) pos[row[i]] = i;

        int slots = n / 2;
        int[] parent = new int[slots];
        int[] size = new int[slots];
        for (int s = 0; s < slots; s++) {
            parent[s] = s;
            size[s] = 1;
        }

        int groups = slots;
        for (int v = 0; v < n; v += 2) {
            // each partner pair (v, v ^ 1) links its two slots
            int a = find(parent, pos[v] / 2);
            int b = find(parent, pos[v ^ 1] / 2);
            if (a == b) continue;
            if (size[a] < size[b]) {
                // union by size: hang the smaller tree under the larger
                parent[a] = b;
                size[b] += size[a];
            } else {
                parent[b] = a;
                size[a] += size[b];
            }
            groups -= 1;
        }
        return slots - groups;
    }

    private int find(int[] parent, int a) {
        int root = a;
        while (parent[root] != root) root = parent[root];
        while (parent[a] != root) {
            // path compression: point every visited node at the root
            int next = parent[a];
            parent[a] = root;
            a = next;
        }
        return root;
    }
}
