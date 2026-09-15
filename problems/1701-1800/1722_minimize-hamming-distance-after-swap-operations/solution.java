import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public int minimumHammingDistance(int[] source, int[] target, int[][] allowedSwaps) {
        int n = source.length;
        int[] parent = new int[n];
        for (int i = 0; i < n; i++) {
            parent[i] = i;
        }
        // Swaps chain into connected components where values can be
        // permuted arbitrarily, and values never leave their component.
        for (int[] swap : allowedSwaps) {
            int ra = find(parent, swap[0]);
            int rb = find(parent, swap[1]);
            if (ra != rb) {
                parent[ra] = rb;
            }
        }
        Map<Integer, List<Integer>> groups = new HashMap<>();
        for (int i = 0; i < n; i++) {
            groups.computeIfAbsent(find(parent, i), r -> new ArrayList<>()).add(i);
        }
        // Per component, match target values against the multiset of
        // source values; each unmatched target must stay different.
        int distance = 0;
        for (List<Integer> members : groups.values()) {
            HashMap<Integer, Integer> have = new HashMap<>();
            for (int i : members) {
                have.merge(source[i], 1, Integer::sum);
            }
            for (int i : members) {
                int v = target[i];
                int c = have.getOrDefault(v, 0);
                if (c > 0) {
                    have.put(v, c - 1);
                } else {
                    distance++;
                }
            }
        }
        return distance;
    }

    private int find(int[] parent, int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }
}
