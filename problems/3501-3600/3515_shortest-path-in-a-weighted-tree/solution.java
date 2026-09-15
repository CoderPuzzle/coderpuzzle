import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    public int[] treeQueries(int n, int[][] edges, int[][] queries) {
        List<List<int[]>> adj = new ArrayList<>();
        for (int i = 0; i <= n; i++) adj.add(new ArrayList<>());
        for (int[] e : edges) {
            adj.get(e[0]).add(new int[] { e[1], e[2] });
            adj.get(e[1]).add(new int[] { e[0], e[2] });
        }

        int[] parent = new int[n + 1];
        long[] upW = new long[n + 1];
        long[] base = new long[n + 1];
        int[] tin = new int[n + 1];
        int[] tout = new int[n + 1];
        int timer = 0;
        // entries: {node, parent, weight to parent, state 0=enter / 1=exit}
        Deque<int[]> stack = new ArrayDeque<>();
        stack.push(new int[] { 1, 0, 0, 0 });
        while (!stack.isEmpty()) {
            int[] top = stack.pop();
            int u = top[0],
                p = top[1],
                w = top[2],
                state = top[3];
            if (state == 0) {
                parent[u] = p;
                upW[u] = w;
                if (p != 0) base[u] = base[p] + w;
                timer += 1;
                tin[u] = timer;
                stack.push(new int[] { u, p, w, 1 });
                List<int[]> neighbors = adj.get(u);
                for (int i = neighbors.size() - 1; i >= 0; i--) {
                    int[] nb = neighbors.get(i);
                    if (nb[0] != p) stack.push(new int[] { nb[0], u, nb[1], 0 });
                }
            } else {
                tout[u] = timer;
            }
        }

        int size = n + 2;
        long[] bit = new long[size + 1];
        int answerLen = 0;
        for (int[] q : queries) if (q[0] == 2) answerLen++;
        long[] answerLong = new long[answerLen];
        int idx = 0;

        for (int[] query : queries) {
            if (query[0] == 2) {
                int x = query[1];
                long s = 0;
                for (int i = tin[x]; i > 0; i -= i & -i) s += bit[i];
                answerLong[idx++] = base[x] + s;
            } else {
                int u = query[1],
                    v = query[2],
                    wp = query[3];
                int child = parent[u] == v ? u : v;
                long delta = wp - upW[child];
                upW[child] = wp;
                for (int i = tin[child]; i <= size; i += i & -i) bit[i] += delta;
                for (int i = tout[child] + 1; i <= size; i += i & -i) bit[i] -= delta;
            }
        }

        int[] answer = new int[answerLen];
        for (int i = 0; i < answerLen; i++) answer[i] = (int) answerLong[i];
        return answer;
    }
}
