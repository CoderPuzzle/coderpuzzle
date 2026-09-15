import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

class Solution {

    public int collectTheCoins(int[] coins, int[][] edges) {
        int n = coins.length;
        List<Set<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new HashSet<>());
        }
        for (int[] e : edges) {
            adj.get(e[0]).add(e[1]);
            adj.get(e[1]).add(e[0]);
        }

        // Phase 1: repeatedly remove leaves that carry no coin.
        List<Integer> leaves = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            if (adj.get(i).size() == 1 && coins[i] == 0) leaves.add(i);
        }
        while (!leaves.isEmpty()) {
            List<Integer> nxt = new ArrayList<>();
            for (int u : leaves) {
                if (!adj.get(u).isEmpty()) {
                    int v = adj.get(u).iterator().next();
                    adj.get(v).remove(u);
                    if (adj.get(v).size() == 1 && coins[v] == 0) nxt.add(v);
                }
                adj.get(u).clear();
            }
            leaves = nxt;
        }

        // Phase 2: drop two more layers of leaves (distance-2 collection).
        for (int round = 0; round < 2; round++) {
            leaves = new ArrayList<>();
            for (int i = 0; i < n; i++) {
                if (adj.get(i).size() == 1) leaves.add(i);
            }
            for (int u : leaves) {
                if (!adj.get(u).isEmpty()) {
                    int v = adj.get(u).iterator().next();
                    adj.get(v).remove(u);
                }
                adj.get(u).clear();
            }
        }

        int remaining = 0;
        for (int i = 0; i < n; i++) {
            if (!adj.get(i).isEmpty()) remaining++;
        }
        return Math.max(0, (remaining - 1) * 2);
    }
}
