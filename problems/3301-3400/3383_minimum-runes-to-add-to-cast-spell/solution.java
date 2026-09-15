import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

class Solution {

    public int minRunesToAdd(int n, int[] crystals, int[] flowFrom, int[] flowTo) {
        List<List<Integer>> graph = new ArrayList<>();
        List<List<Integer>> rgraph = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            graph.add(new ArrayList<>());
            rgraph.add(new ArrayList<>());
        }
        for (int e = 0; e < flowFrom.length; e++) {
            int u = flowFrom[e];
            int v = flowTo[e];
            graph.get(u).add(v);
            rgraph.get(v).add(u);
        }

        // Kosaraju SCC (iterative)
        boolean[] visited = new boolean[n];
        int[] order = new int[n];
        int oi = 0;
        int[] stack = new int[n];
        int[] ptr = new int[n];
        for (int s = 0; s < n; s++) {
            if (visited[s]) {
                continue;
            }
            int sp = 0;
            stack[0] = s;
            ptr[0] = 0;
            visited[s] = true;
            while (sp >= 0) {
                int u = stack[sp];
                if (ptr[sp] < graph.get(u).size()) {
                    int v = graph.get(u).get(ptr[sp]++);
                    if (!visited[v]) {
                        visited[v] = true;
                        stack[++sp] = v;
                        ptr[sp] = 0;
                    }
                } else {
                    order[oi++] = u;
                    sp--;
                }
            }
        }

        int[] comp = new int[n];
        java.util.Arrays.fill(comp, -1);
        int cid = 0;
        for (int idx = n - 1; idx >= 0; idx--) {
            int s = order[idx];
            if (comp[s] != -1) {
                continue;
            }
            int sp = 0;
            stack[0] = s;
            comp[s] = cid;
            while (sp >= 0) {
                int u = stack[sp--];
                for (int v : rgraph.get(u)) {
                    if (comp[v] == -1) {
                        comp[v] = cid;
                        stack[++sp] = v;
                    }
                }
            }
            cid++;
        }

        boolean[] hasCrystal = new boolean[cid];
        for (int c : crystals) {
            hasCrystal[comp[c]] = true;
        }

        List<List<Integer>> cgraph = new ArrayList<>();
        for (int i = 0; i < cid; i++) {
            cgraph.add(new ArrayList<>());
        }
        int[] inDeg = new int[cid];
        Set<Long> seen = new HashSet<>();
        for (int u = 0; u < n; u++) {
            for (int v : graph.get(u)) {
                int cu = comp[u];
                int cv = comp[v];
                if (cu != cv) {
                    long key = ((long) cu << 32) | cv;
                    if (seen.add(key)) {
                        cgraph.get(cu).add(cv);
                        inDeg[cv]++;
                    }
                }
            }
        }

        // BFS from crystal-containing components
        boolean[] good = new boolean[cid];
        Deque<Integer> q = new ArrayDeque<>();
        for (int c = 0; c < cid; c++) {
            if (hasCrystal[c]) {
                good[c] = true;
                q.add(c);
            }
        }
        while (!q.isEmpty()) {
            int u = q.poll();
            for (int v : cgraph.get(u)) {
                if (!good[v]) {
                    good[v] = true;
                    q.add(v);
                }
            }
        }

        int ans = 0;
        for (int c = 0; c < cid; c++) {
            if (!good[c] && inDeg[c] == 0) {
                ans++;
            }
        }
        return ans;
    }
}
