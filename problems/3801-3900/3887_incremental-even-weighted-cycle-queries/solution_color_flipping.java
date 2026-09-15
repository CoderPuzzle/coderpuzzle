import java.util.ArrayList;
import java.util.List;

class Solution {

    public int numberOfEdgesAdded(int n, int[][] edges) {
        int[] parent = new int[n];
        int[] size = new int[n];
        int[] color = new int[n]; // absolute color of each node within its component
        List<List<Integer>> members = new ArrayList<>(n); // per-root member lists
        for (int i = 0; i < n; i++) {
            parent[i] = i;
            size[i] = 1;
            List<Integer> seed = new ArrayList<>();
            seed.add(i);
            members.add(seed);
        }

        int added = 0;
        for (int[] e : edges) {
            int u = e[0];
            int v = e[1];
            int w = e[2];
            int ru = find(u, parent);
            int rv = find(v, parent);
            if (ru == rv) {
                // the standing path parity is color[u] ^ color[v]: an O(1) verdict
                if ((color[u] ^ color[v]) == w) added++;
            } else {
                if (size[ru] < size[rv]) {
                    int tmp = ru;
                    ru = rv;
                    rv = tmp; // ru is now the larger root
                }
                if ((color[u] ^ color[v]) != w) {
                    // recolor the smaller component: every relation inside it
                    // survives a uniform flip, while the new edge's demand flips
                    for (int m : members.get(rv)) color[m] ^= 1;
                }
                parent[rv] = ru;
                size[ru] += size[rv];
                members.get(ru).addAll(members.get(rv));
                added++;
            }
        }
        return added;
    }

    // membership only: path halving, no parity bookkeeping
    private int find(int x, int[] parent) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }
}
