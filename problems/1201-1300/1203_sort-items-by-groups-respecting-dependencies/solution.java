import java.util.*;

class Solution {

    public int[] sortItems(int n, int m, int[] group, int[][] beforeItems) {
        int[] grp = new int[n];
        int total = m;
        for (int i = 0; i < n; i++) {
            if (group[i] == -1) {
                grp[i] = total;
                total++;
            } else {
                grp[i] = group[i];
            }
        }

        List<List<Integer>> itemAdj = new ArrayList<>();
        for (int i = 0; i < n; i++) itemAdj.add(new ArrayList<>());
        List<List<Integer>> groupAdj = new ArrayList<>();
        for (int i = 0; i < total; i++) groupAdj.add(new ArrayList<>());
        int[] groupIndeg = new int[total];
        for (int i = 0; i < n; i++) {
            for (int b : beforeItems[i]) {
                itemAdj.get(b).add(i);
                int gb = grp[b],
                    gi = grp[i];
                if (gb != gi) {
                    groupAdj.get(gb).add(gi);
                    groupIndeg[gi]++;
                }
            }
        }

        // LIFO Kahn: stack initialized in descending id order so the smallest
        // zero-indegree id pops first; newly available nodes are pushed on top.
        int[] groupOrder = kahn(total, groupAdj, groupIndeg);
        if (groupOrder == null) return new int[0];

        List<List<Integer>> itemsInGroup = new ArrayList<>();
        for (int i = 0; i < total; i++) itemsInGroup.add(new ArrayList<>());
        for (int i = 0; i < n; i++) itemsInGroup.get(grp[i]).add(i);

        int[] result = new int[n];
        int idx = 0;
        int[] indeg2 = new int[n];
        List<List<Integer>> adj2 = new ArrayList<>();
        for (int i = 0; i < n; i++) adj2.add(new ArrayList<>());
        for (int g : groupOrder) {
            List<Integer> nodes = itemsInGroup.get(g);
            if (nodes.isEmpty()) continue;
            for (int u : nodes) {
                indeg2[u] = 0;
                adj2.get(u).clear();
            }
            for (int u : nodes) {
                for (int v : itemAdj.get(u)) {
                    if (grp[v] == g) {
                        adj2.get(u).add(v);
                        indeg2[v]++;
                    }
                }
            }
            int[] order = kahnItems(nodes, adj2, indeg2);
            if (order == null) return new int[0];
            for (int x : order) result[idx++] = x;
        }
        return result;
    }

    private int[] kahn(int total, List<List<Integer>> adj, int[] indegIn) {
        int[] indeg = indegIn.clone();
        Deque<Integer> stack = new ArrayDeque<>();
        for (int k = total - 1; k >= 0; k--) {
            if (indeg[k] == 0) stack.push(k);
        }
        int[] order = new int[total];
        int cnt = 0;
        while (!stack.isEmpty()) {
            int u = stack.pop();
            order[cnt++] = u;
            for (int v : adj.get(u)) {
                if (--indeg[v] == 0) stack.push(v);
            }
        }
        return cnt == total ? order : null;
    }

    private int[] kahnItems(List<Integer> nodes, List<List<Integer>> adj, int[] indeg) {
        Deque<Integer> stack = new ArrayDeque<>();
        for (int i = nodes.size() - 1; i >= 0; i--) {
            if (indeg[nodes.get(i)] == 0) stack.push(nodes.get(i));
        }
        int[] order = new int[nodes.size()];
        int cnt = 0;
        while (!stack.isEmpty()) {
            int u = stack.pop();
            order[cnt++] = u;
            for (int v : adj.get(u)) {
                if (--indeg[v] == 0) stack.push(v);
            }
        }
        return cnt == nodes.size() ? order : null;
    }
}
